from fastapi import Body, WebSocket, WebSocketDisconnect
from datetime import datetime

from ..Repositories.meeting_repository import MeetingRepository
from ..Repositories.team_repository import TeamRepository
from ..Repositories.user_repository import UserRepository

from ..Schemas.meeting_schemas import MeetingCreateSchema
from ..models import Team, Meeting

# Service
class MeetingService:
    def __init__(self, meeting_repo: MeetingRepository, team_repo: TeamRepository, user_repo: UserRepository):
        self.meeting_repo = meeting_repo
        self.team_repo = team_repo
        self.user_repo = user_repo


    def get_meeting_state(self, meeting_id:int ) -> dict:
        return get_meeting_state(meeting_id)

    async def start_meeting(self, team_id: int, meeting_data: MeetingCreateSchema = Body(...), user_id: int = None):
        title = meeting_data.title
        print("Meeting Title:", title)

        team = await self.team_repo.get_by_id(team_id)
        if not team:
            raise LookupError("Team not found")

        owner_access = team and self.team_repo.is_owner(team, user_id)
        member_access = team and self.team_repo.is_member(team, user_id)

        if not owner_access and not member_access:
            raise PermissionError("Only team owner and team member can start a meeting")

        current_time = datetime.now()
        meeting = Meeting(team_id=team_id, title=title, host_id=user_id, status="active", started_at=current_time)
        await self.meeting_repo.save(meeting)

        start_meeting_state(meeting.id, user_id)
        return meeting

    async def end_meeting(self, meeting_id: int, user_id: int):
        meeting = await self.meeting_repo.get_by_id(meeting_id)
        if not meeting:
            raise LookupError("Meeting not found")

        if meeting.host_id != user_id:
            raise PermissionError("Only the host can end the meeting")

        meeting.status = "inactive"
        meeting.ended_at = datetime.now()
        await self.meeting_repo.update(meeting)

        end_meeting_state(meeting_id)
        return meeting

    async def join_meeting(self, meeting_id: int, user_id: int):
        meeting = await self.meeting_repo.get_by_id(meeting_id)
        if not meeting:
            raise LookupError("Meeting not found")

        team = await self.team_repo.get_by_id(meeting.team_id)
        if not team:
            raise LookupError("Associated team not found")

        authorized = isAuthorized(user_id, team)
        if not authorized:
            raise PermissionError("You are not authorized to join this meeting")

        user = await self.user_repo.get_by_id(user_id)
        join(meeting_id, user_id, user.username)
        return get_meeting_state(meeting_id)

    async def leave_meeting(self, meeting_id: int, user_id: int):
        meeting = await self.meeting_repo.get_by_id(meeting_id)
        if not meeting:
            raise LookupError("Meeting not found")

        team = await self.team_repo.get_by_id(meeting.team_id)
        if not team:
            raise LookupError("Associated team not found")

        authorized = isAuthorized(user_id, team)
        if not authorized:
            raise PermissionError("You are not authorized to leave this meeting")

        leave(meeting_id, user_id)

        state = get_meeting_state(meeting_id)
        if state["participants_count"] <= 0:
            meeting.status = "inactive"
            meeting.ended_at = datetime.utcnow()
            await self.meeting_repo.update(meeting)
            end_meeting_state(meeting_id)

        return get_meeting_state(meeting_id)

    async def get_team_meetings(self, team_id: int, user_id: int) -> list[Meeting]:
        team = await self.team_repo.get_by_id(team_id)
        if not team:
            raise LookupError("Team not found")

        authorized = isAuthorized(user_id, team)
        if not authorized:
            raise PermissionError("You are not authorized to view meetings of this team")

        meetings = await self.meeting_repo.get_meetings_by_team_id(team_id)

        return meetings

    async def get_meeting_by_id(self, meeting_id: int, user_id: int) -> Meeting:
        meeting = await self.meeting_repo.get_by_id(meeting_id)
        if not meeting:
            raise LookupError("Meeting not found")

        team = await self.team_repo.get_by_id(meeting.team_id)
        if not team:
            raise LookupError("Associated team not found")

        authorized = isAuthorized(user_id, team)
        if not authorized:
            raise PermissionError("You are not authorized to view this meeting")

        return meeting

# CSOT Meeting
meeting_state = {}

def _init_meeting_state(meeting_id: int):
    global meeting_state
    if meeting_id not in meeting_state:
        meeting_state[meeting_id] = {
            "participants_count": 0,
            "participants": [],
            "is_active": False,
        }

    return meeting_state[meeting_id]

def start_meeting_state(meeting_id: int, host_id: int):
    state = _init_meeting_state(meeting_id)
    state["is_active"] = True
    state["participants_count"] = 1
    state["participants"].append({"user_id": host_id, "username": "Host"})

def end_meeting_state(meeting_id: int):
    state = _init_meeting_state(meeting_id)
    state["is_active"] = False
    state["participants"].clear()
    state["participants_count"] = 0

def join(meeting_id: int, user_id: int, username: str):
    state = _init_meeting_state(meeting_id)
    state["participants"].append({"user_id": user_id, "username": username})
    state["participants_count"] += 1
    state["is_active"] = True

def leave(meeting_id: int, user_id: int):
    state = _init_meeting_state(meeting_id)
    state["participants"] = [p for p in state["participants"] if p["user_id"] != user_id]
    state["participants_count"] -= 1
    if state["participants_count"] <= 0:
        state["is_active"] = False

def get_meeting_state(meeting_id: int):
    state = _init_meeting_state(meeting_id)
    return state

# --------------- Meeting Helper ---------------
def isAuthorized(user_id: int, team: Team) -> bool:
    if team.owner_id == user_id:
        return True
    for member in team.members:
        if member.id == user_id:
            return True
    return False


# todo[]: Implement Websocket For Real-Time In Meeting Page

