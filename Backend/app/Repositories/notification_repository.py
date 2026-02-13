from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..models import Notification

class NotificationRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_unseen_notifications(self, user_id: int) -> list[Notification]:
        result = await self.db.execute(
            select(Notification).where(Notification.user_id == user_id, Notification.seen == False).order_by(Notification.created_at.desc())
        )
        return result.scalars().all()

    async def save_notification(self, notification: Notification) -> Notification:
        self.db.add(notification)
        await self.db.commit()
        await self.db.refresh(notification)
        return notification
    async def save_notification(self, user_id: int, description: str) -> Notification:
        notification = Notification(user_id=user_id, description=description, created_at=datetime.utcnow())
        self.db.add(notification)
        await self.db.commit()
        await self.db.refresh(notification)
        return notification

