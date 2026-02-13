from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from ..Services.notifications import NotificationService
from ..Repositories.notification_repository import NotificationRepository
from ..Database.database import get_db
from ..utils.jwt_helper import get_current_user

notification_router = APIRouter(prefix="/notifications", tags=["Notifications"])

@notification_router.get("/unseen")
async def get_unseen_notifications(current_user: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    user_id = current_user.get("user_id")
    notification_service = NotificationService(NotificationRepository(db), None)
    unseen_notifications = await notification_service.get_unseen_notifications(user_id, db)

    print(f"\nUnseen notifications for user {user_id}: {[n.description for n in unseen_notifications]} (notification_route.py)\n")

    return {"unseen_notifications": unseen_notifications}
