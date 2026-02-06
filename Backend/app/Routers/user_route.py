from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..models import User

from ..Database.database import get_db
from ..utils.jwt_helper import get_current_user, get_user_from_token
from ..utils.ws_manager import notification_manager


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

@user_router.websocket("/ws/notifications")
async def notification_ws(websocket: WebSocket):
    print("WS connection attempt received")
    token = websocket.query_params.get("token")
    print("WS token received:", token)

    user = await get_user_from_token(token)
    print("WS user from token:", user)

    if not user:
        await websocket.close(code=1008)
        return

    await notification_manager.connect(websocket, user.get("user_id"))

    try:
        while True:
            await websocket.receive_text()  # Keep the connection alive
    except WebSocketDisconnect:
        await notification_manager.disconnect(websocket, user.get("user_id"))

