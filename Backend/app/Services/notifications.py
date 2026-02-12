from ..Repositories.team_repository import TeamRepository
from ..Repositories.notification_repository import NotificationRepository
from ..utils.ws_manager import notification_manager

class NotificationService:
    def __init__(self, notification_repo: NotificationRepository, team_repo: TeamRepository):
        self.notification_repo = notification_repo
        self.team_repo = team_repo

    async def get_unseen_notifications(self, user_id: int, db) -> list[dict]:
        notifications = await self.notification_repo.get_unseen_notifications(user_id)
        return [n.model_dump() for n in notifications]

    async def notify_team_meeting_starts(self, team_id: int, meeting_data, user_id: int, db):
        team_repo = TeamRepository(db)
        members = await team_repo.get_all_members_id(team_id)

        members = [int(m) for m in members]

        payload = {
            "type": "meeting",
            "team_id": team_id,
            "meeting_data": meeting_data.model_dump(),
            "message": f"A meeting has started for team {team_id}"
        }

        # todo[]: Improve notification content and type for better handling on the frontend, maybe include meeting_id and team_name in the payload for better user experience

        print(f"\nSaving notification to db(notifications.py)\n")
        await self.notification_repo.save_notification(user_id, f"A meeting start from team: {team_id}")

        print(f"\nNotifying members: {members} (notifications.py)\n")
        await notification_manager.notify_users(members, payload)

