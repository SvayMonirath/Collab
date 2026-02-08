from urllib import response
from fastapi import HTTPException, Response, WebSocket

from ..Repositories.user_repository import UserRepository
from ..models import User
from ..Schemas.auth_schemas import RegisterInput, LoginInput
from ..utils.jwt_helper import JWT_ACCESS_TOKEN_EXPIRE_MINUTES, create_jwt_token

class AuthService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    async def register_user(self, user_input: RegisterInput) -> User:
        if await self.repo.get_by_email(user_input.email):
            raise ValueError("Email already registered (auth_service.py)")

        if await self.repo.get_by_username(user_input.username):
            raise ValueError("Username already taken (auth_service.py)")

        if user_input.password != user_input.confirmPassword:
            raise ValueError("Passwords do not match (auth_service.py)")

        new_user = User(
            username=user_input.username,
            email=user_input.email,
        )

        new_user.set_password(user_input.password)

        saved_user = await self.repo.save(new_user)

        return saved_user

    async def login_user(self, login_input: LoginInput):
        user = await self.repo.get_by_username(login_input.username)

        if not user or not user.verify_password(login_input.password):
            raise LookupError("Invalid email/username or password (auth_service.py)")

        token_data = {
            "user_id": user.id,
            "username": user.username,
        }
        token = create_jwt_token(token_data)

        return token

