from ..Repositories.team_repository import TeamRepository
from ..utils.ws_manager import notification_manager

async def notify_team_meeting_starts(team_id: int, db):
    team_repo = TeamRepository(db)
    members = await team_repo.get_all_members_id(team_id)

    # Ensure members are ints to match NotificationManager
    members = [int(m) for m in members]

    # todo[]: Enhance payload for more detailed notifications or convenient button actions redirecting to the teamHome Page 
    payload = {
        "type": "meeting_started",
        "team_id": team_id,
        "message": f"A meeting has started for team {team_id}"
    }

    print(f"Notifying members: {members}")
    await notification_manager.notify_users(members, payload)

