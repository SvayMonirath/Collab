from dotenv import load_dotenv
from fastapi import APIRouter, Body, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession

from ..Database.database import get_db, SessionLocal
from ..utils.jwt_helper import get_current_user
from ..utils.ws_manager import meeting_manager, team_manager
from ..Services.notifications import notify_team_meeting_starts
from ..Schemas.meeting_schemas import MeetingCreateSchema
from ..Services.meeting_service import MeetingService
from ..Repositories.meeting_repository import MeetingRepository
from ..Repositories.team_repository import TeamRepository
from ..Repositories.user_repository import UserRepository

load_dotenv()
meeting_router = APIRouter(prefix="/meetings", tags=["Meetings"])

# --------------- Meeting Endpoints ---------------

# get meeting current state
@meeting_router.get("/state/{meeting_id}")
async def get_meeting_current_state( meeting_id: int, current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    meeting_repo = MeetingRepository(db)
    team_repo = TeamRepository(db)
    user_repo = UserRepository(db)
    service = MeetingService(meeting_repo, team_repo, user_repo)
    state = service.get_meeting_state(meeting_id)
    return {"meeting_state": state}

# todo[x]: Start Meeting Completed
# start meeting
@meeting_router.post("/start/{team_id}")
async def start_meeting(team_id: int, meeting_data: MeetingCreateSchema = Body(...), db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
        Goal: Start a meeting for a team
        Conditions: Only team owner and team member can start a meeting
    """
    try:
        meeting_repo = MeetingRepository(db)
        team_repo = TeamRepository(db)
        user_repo = UserRepository(db)
        meeting_service = MeetingService(meeting_repo, team_repo, user_repo)
        user_id = current_user.get("user_id")
        meeting = await meeting_service.start_meeting(team_id=team_id, meeting_data=meeting_data, user_id=user_id)

        await notify_team_meeting_starts(team_id, meeting_data,  db)

        return {"message": f"Meeting started successfully", "meeting_id": meeting.id}
    except LookupError as le:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(le))
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe))

# end meeting
@meeting_router.post("/end/{meeting_id}")
async def end_meeting(meeting_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    try:
        meeting_repo = MeetingRepository(db)
        team_repo = TeamRepository(db)
        user_repo = UserRepository(db)
        meeting_service = MeetingService(meeting_repo, team_repo, user_repo)
        user_id = current_user.get("user_id")
        meeting = await meeting_service.end_meeting(meeting_id=meeting_id, user_id=user_id)
        return {"message": f"Meeting {meeting.id} ended"}
    except LookupError as le:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(le))
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe))

# join meeting
@meeting_router.post("/join/{meeting_id}")
async def join_meeting(meeting_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    try:
        meeting_repo = MeetingRepository(db)
        team_repo = TeamRepository(db)
        user_repo = UserRepository(db)
        meeting_service = MeetingService(meeting_repo, team_repo, user_repo)
        current_id = current_user.get("user_id")
        await meeting_service.join_meeting(meeting_id=meeting_id, user_id=current_id)
        current_username = current_user.get("username")
        return {"message": f"User {current_username} joined meeting {meeting_id}"}
    except LookupError as le:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(le))
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe))

# leave meeting
@meeting_router.post("/leave/{meeting_id}/{team_id}")
async def leave_meeting(meeting_id: int, team_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    try:
        meeting_repo = MeetingRepository(db)
        team_repo = TeamRepository(db)
        user_repo = UserRepository(db)
        meeting_service = MeetingService(meeting_repo, team_repo, user_repo)
        current_user_id = current_user.get("user_id")
        await meeting_service.leave_meeting(meeting_id=meeting_id, user_id=current_user_id)

        await team_manager.broadcast_active_meeting_update(
            team_id,
            {
                "type": "active_meeting_update",
                "payload": None,
            },
        )

        return {"message": f"User {current_user_id} left meeting {meeting_id}"}
    except LookupError as le:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(le))
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe))

@meeting_router.get("/get_meetings/team/{team_id}")
async def get_team_meetings(team_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
        Goal: Get all meetings for a team and check if there are active meetings
        Conditions: Only team members can view meetings
    """
    try:
        meeting_repo = MeetingRepository(db)
        team_repo = TeamRepository(db)
        user_repo = UserRepository(db)
        meeting_service = MeetingService(meeting_repo, team_repo, user_repo)
        current_user_id = current_user.get("user_id")
        meetings = await meeting_service.get_team_meetings(team_id=team_id, user_id=current_user_id)

        return {"meetings": meetings}
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe))

@meeting_router.get("/get_meeting/{meeting_id}")
async def get_meeting(meeting_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
        Goal: Get meeting details by meeting ID
        Conditions: Only team members can view meeting details
    """
    try:
        meeting_repo = MeetingRepository(db)
        team_repo = TeamRepository(db)
        user_repo = UserRepository(db)
        meeting_service = MeetingService(meeting_repo, team_repo, user_repo)
        current_user_id = current_user.get("user_id")
        meeting = await meeting_service.get_meeting_by_id(meeting_id=meeting_id, user_id=current_user_id)
        return {"meeting": meeting}
    except PermissionError as pe:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=str(pe))
    except LookupError as le:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(le))

# Websocket endpoint for meeting
@meeting_router.websocket("/ws/audio/{meeting_id}")
async def meeting_websocket_endpoint(websocket: WebSocket, meeting_id: int):
    await meeting_manager.connect(websocket, meeting_id)

    try:
        while True:
            event = await websocket.receive_text()

            if event == "join":
                await meeting_manager.broadcast_participants_update(meeting_id)


    except WebSocketDisconnect:
        meeting_manager.disconnect(websocket, meeting_id)
        await meeting_manager.broadcast_participants_update(meeting_id)

@meeting_router.websocket("/ws/Team/{team_id}")
async def team_websocket_endpoint(websocket: WebSocket, team_id: int):
    await team_manager.connect(websocket, team_id)
    print(f"\nWebSocket connected for team {team_id} (meeting_route.py)\n")

    async with SessionLocal() as db:
        meeting_repo = MeetingRepository(db)

        active_meeting = await meeting_repo.get_latest_active_meeting_by_team_id(team_id)
        if active_meeting:
            await team_manager.broadcast_active_meeting_update(
                team_id,
                {
                    "type": "active_meeting_update",
                    "payload": {
                        "id": active_meeting.id,
                        "title": active_meeting.title,
                        "started_at": active_meeting.started_at.isoformat(),
                    },
                },
            )

        try:
            while True:
                event = await websocket.receive_text()
                print(f"\nWS event received: {event} (meeting_route.py)\n")

                if event == "start_meeting":
                    meeting = await meeting_repo.get_latest_active_meeting_by_team_id(team_id)
                    print(f"\nActive meeting fetched: {meeting} (meeting_route.py)\n")
                    if meeting:
                        await team_manager.broadcast_active_meeting_update(
                            team_id,
                            {
                                "type": "active_meeting_update",
                                "payload": {
                                    "id": meeting.id,
                                    "title": meeting.title,
                                    "started_at": meeting.started_at.isoformat(),
                                },
                            },
                            f"A new meeting '{meeting.title}' has started in team {team_id}."
                        )

                if event == "end_meeting":
                    await team_manager.broadcast_active_meeting_update(
                        team_id,
                        {
                            "type": "active_meeting_update",
                            "payload": None,
                        },
                    )

        except WebSocketDisconnect:
            team_manager.disconnect(websocket, team_id)
            print(f"\nWebSocket disconnected for team {team_id} (meeting_route.py)\n")
        except Exception as e:
            print(f"\nWebSocket error: {e} (meeting_route.py)\n")
            team_manager.disconnect(websocket, team_id)
            await websocket.close(code=1011)
