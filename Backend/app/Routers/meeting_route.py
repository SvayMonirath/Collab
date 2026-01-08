from fastapi import APIRouter, Body, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from sqlalchemy.future import select
from datetime import datetime


from ..Database.database import get_db
from ..models import Team, Meeting
from ..utils.jwt_helper import get_current_user
from ..Schemas.meeting_schemas import MeetingCreateSchema

meeting_router = APIRouter(prefix="/meetings", tags=["Meetings"])
# --------------- CSOT Meeting ---------------
# central source of truth for meeting management

meeting_state = {}

def _init_meeting_state(meeting_id: int):
    global meeting_state
    if meeting_id not in meeting_state:
        meeting_state[meeting_id] = {
            "host_id": None,
            "participants_count": 0,
            "participants": [],
            "is_active": False,
        }

    return meeting_state[meeting_id]

def start_meeting_state(meeting_id: int, host_id: int):
    state = _init_meeting_state(meeting_id)
    state["host_id"] = host_id
    state["is_active"] = True
    state["participants_count"] = 1

def end_meeting_state(meeting_id: int):
    state = _init_meeting_state(meeting_id)
    state["is_active"] = False
    state["participants"].clear()
    state["participants_count"] = 0

def join(meeting_id: int, user_id: int, username: str):
    state = _init_meeting_state(meeting_id)
    state["participants"].append({"user_id": user_id, "username": username})
    state["participants_count"] += 1

def leave(meeting_id: int, user_id: int):
    state = _init_meeting_state(meeting_id)
    state["participants"] = [p for p in state["participants"] if p["user_id"] != user_id]
    state["participants_count"] -= 1

def get_meeting_state(meeting_id: int):
    state = _init_meeting_state(meeting_id)
    return state

# --------------- Meeting Endpoints ---------------

# get meeting current state
@meeting_router.get("/state/{meeting_id}")
async def get_meeting_current_state( meeting_id: int, current_user: dict = Depends):
    state = get_meeting_state(meeting_id)
    return state

# TODO[X]: Start Meeting Completed
# start meeting
@meeting_router.post("/start/{team_id}")
async def start_meeting(team_id: int, meeting_data: MeetingCreateSchema = Body(...), db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
        Goal: Start a meeting for a team
        Conditions: Only team owner and team member can start a meeting
    """

    title = meeting_data.title
    print("Meeting Title:", title)

    team = await db.execute(select(Team).where(Team.id == team_id).options(selectinload(Team.members)))
    team = team.scalar_one_or_none()
    if not team:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")

    current_user_id = current_user.get("user_id")

    if not isAuthorized(current_user_id, team):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only team owner can start a meeting")

    # use my navtive datetime
    current_time = datetime.now()
    meeting = Meeting(team_id=team_id, title=title, host_id=current_user_id, status="active", started_at=current_time)
    db.add(meeting)
    await db.commit()
    await db.refresh(meeting)

    start_meeting_state(meeting.id, current_user_id)

    return {"message": f"Meeting started for team {team.title}", "meeting_id": meeting.id}

# end meeting
@meeting_router.post("/end/{meeting_id}")
async def end_meeting(meeting_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    meeting = await db.execute(select(Meeting).where(Meeting.id == meeting_id))
    meeting = meeting.scalar_one_or_none()
    if not meeting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found")

    current_user_id = current_user.get("id")
    if meeting.host_id != current_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only the host can end the meeting")

    # later condition: When no participants are left in the meeting

    meeting.status = "inactive"
    meeting.ended_at = datetime.utcnow()
    await db.commit()
    await db.refresh(meeting)

    end_meeting_state(meeting_id)

    return {"message": f"Meeting {meeting_id} ended"}

# join meeting
@meeting_router.post("/join/{meeting_id}")
async def join_meeting(meeting_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    meeting = await db.execute(select(Meeting).where(Meeting.id == meeting_id))
    meeting = meeting.scalar_one_or_none()
    if not meeting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found")

    current_user_id = current_user.get("id")
    current_username = current_user.get("username")

    join(meeting_id, current_user_id, current_username)

    return {"message": f"User {current_username} joined meeting {meeting_id}"}
# leave meeting
@meeting_router.post("/leave/{meeting_id}")
async def leave_meeting(meeting_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    meeting = await db.execute(select(Meeting).where(Meeting.id == meeting_id))
    meeting = meeting.scalar_one_or_none()
    if not meeting:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Meeting not found")

    current_user_id = current_user.get("id")
    leave(meeting_id, current_user_id)

    return {"message": f"User {current_user_id} left meeting {meeting_id}"}

@meeting_router.get("/get_meetings/team/{team_id}")
async def get_team_meetings(team_id: int, db: AsyncSession = Depends(get_db), current_user: dict = Depends(get_current_user)):
    """
        Goal: Get all meetings for a team and check if there are active meetings
        Conditions: Only team members can view meetings
    """

    team = await db.execute(select(Team).where(Team.id == team_id).options(selectinload(Team.members)))
    team = team.scalar_one_or_none()
    if not team:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Team not found")

    current_user_id = current_user.get("user_id")

    if not isAuthorized(current_user_id, team):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only team members can view meetings")

    meetings = await db.execute(select(Meeting).where(Meeting.team_id == team_id))
    meetings = meetings.scalars().all()

    return {"meetings": meetings}

# --------------- Meeting Helper ---------------
def isAuthorized(user_id: int, team: Team) -> bool:
    if team.owner_id == user_id:
        return True
    for member in team.members:
        if member.id == user_id:
            return True
    return False
