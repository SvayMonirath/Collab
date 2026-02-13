from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..Database.database import get_db
from ..utils.jwt_helper import JWT_ACCESS_TOKEN_EXPIRE_MINUTES, create_jwt_token, get_current_user
from ..models import User
from ..Schemas.auth_schemas import RegisterInput, LoginInput

from ..Services.auth_service import AuthService
from ..Repositories.user_repository import UserRepository


auth_router = APIRouter(prefix="/auth", tags=["Authentication"])

#  --------------- Register Endpoint ---------------
@auth_router.post("/register")
async def register(user_input: RegisterInput, db: AsyncSession = Depends(get_db)):
    try:
        user_repo = UserRepository(db)
        auth_service = AuthService(user_repo)
        new_user = await auth_service.register_user(user_input)
        return {"message": "User registered successfully", "user_id": new_user.id}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

# --------------- Login Endpoint ---------------
@auth_router.post("/login")
async def login(login_input: LoginInput, response: Response, db: AsyncSession = Depends(get_db)):
    try:
        user_repo = UserRepository(db)
        auth_service = AuthService(user_repo)
        token = await auth_service.login_user(login_input)

        response.set_cookie(
            key="accessToken",
            value=token,
            httponly=True,
            max_age=JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            expires=JWT_ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            samesite="lax",
            secure=False,
        )

        return {"message": "Login successful"}
    except LookupError as le:
        raise HTTPException(status_code=401, detail=str(le))

# --------------- Logout Endpoint ---------------
@auth_router.post("/logout")
async def logout(response: Response, current_user: dict = Depends(get_current_user)):
    user = current_user
    if user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    response.delete_cookie(key="accessToken")

    return {"message": "Logout successful"}

@auth_router.get("/ws_token")
async def get_ws_token(current_user: dict = Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token_data = {
        "user_id": current_user.get("user_id"),
        "username": current_user.get("username"),
    }
    token = create_jwt_token(token_data)

    return {"token": token}

# -------------- Check Authentication Status ---------------
@auth_router.get("/status")
async def check_auth_status(current_user: dict = Depends(get_current_user)):
    if current_user is None:
        return {"is_authenticated": False}
    return {"is_authenticated": True, "user": current_user}

# --------------- Test Access Token ---------------
@auth_router.get("/test-token")
async def test_token(current_user: dict = Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return {"message": "Token is valid", "user": current_user}


# todo[]: OAuth
