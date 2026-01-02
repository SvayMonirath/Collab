from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..models import User

from ..Database.database import get_db
from ..utils.jwt_helper import get_current_user


user_router = APIRouter(prefix="/users", tags=["Users"])

# --------------- Get Current User Endpoint ---------------
@user_router.get('/me')
async def get_current_user_info(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")
    user = await db.execute(select(User).where(User.id == current_user_id))
    user = user.scalars().first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "user_id": user.id,
        "username": user.username,
        "email": user.email,
    }
