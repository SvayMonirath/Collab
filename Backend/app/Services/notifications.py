from ..Repositories.team_repository import TeamRepository
from ..utils.ws_manager import notification_manager

async def notify_team_meeting_starts(team_id: int, meeting_data, db):
    team_repo = TeamRepository(db)
    members = await team_repo.get_all_members_id(team_id)

    members = [int(m) for m in members]

    # todo[x]: Enhance payload for more detailed notifications or convenient button actions redirecting to the teamHome Page
    payload = {
        "type": "meeting",
        "team_id": team_id,
        "meeting_data": meeting_data.model_dump(),
        "message": f"A meeting has started for team {team_id}"
    }

    print(f"\nNotifying members: {members} (notifications.py)\n")
    await notification_manager.notify_users(members, payload)

