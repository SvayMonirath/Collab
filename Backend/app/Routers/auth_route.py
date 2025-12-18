from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from ..Database.database import get_db
from ..utils.jwt_helper import create_jwt_token
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
    if user_input.password != user_input.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    new_user = User(
        username=user_input.username,
        email=user_input.email,
    )
    new_user.set_password(user_input.password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    return {"message": "User registered successfully"}

# --------------- Login Endpoint ---------------
@auth_router.post("/login")
async def login(login_input: LoginInput, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == login_input.email))
    user = result.scalar_one_or_none()

    if not user or not user.verify_password(login_input.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_jwt_token({"user_id": user.id, "username": user.username})
    return {"access_token": token, "message": "Login successful"}
