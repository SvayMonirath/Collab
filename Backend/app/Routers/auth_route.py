from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..Database.database import get_db
from ..utils.jwt_helper import JWT_ACCESS_TOKEN_EXPIRE_MINUTES, create_jwt_token, get_current_user
from ..models import User
from ..Schemas.auth_schemas import RegisterInput, LoginInput

auth_router = APIRouter(prefix="/auth", tags=["Authentication"])

#  --------------- Register Endpoint ---------------
@auth_router.post("/register")
async def register(user_input: RegisterInput, db: AsyncSession = Depends(get_db)):
    # Query to check if email or username already exists
    result = await db.execute(select(User).where(User.email == user_input.email))
    existing_user = result.scalar_one_or_none()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    result = await db.execute(select(User).where(User.username == user_input.username))
    existing_user = result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already taken")
    #  check for in matching passwords
    if user_input.password != user_input.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    new_user = User(
        username=user_input.username,
        email=user_input.email,
    )
    new_user.set_password(user_input.password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"message": "User registered successfully", "success": True}

# --------------- Login Endpoint ---------------
@auth_router.post("/login")
async def login(login_input: LoginInput, response: Response, db: AsyncSession = Depends(get_db)):
    user = await db.execute(select(User).where(
        User.username == login_input.username
    ))
    user = user.scalar_one_or_none()

    if not user or not user.verify_password(login_input.password):
        raise HTTPException(status_code=401, detail="Invalid email/username or password")

    # token last 7 days if rememberMe is true else default expire time
    expire_minute = 7*24*60 if login_input.rememberMe else JWT_ACCESS_TOKEN_EXPIRE_MINUTES
    token = create_jwt_token({"user_id": user.id, "username": user.username})
    response.set_cookie(key="accessToken", value=token, httponly=True, secure=True, samesite="lax", max_age=expire_minute * 60)
    return {"message": "Login successful"}

# --------------- Logout Endpoint ---------------
@auth_router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="accessToken")
    return {"message": "Logout successful"}

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


# todo[]: Implement OAuth
