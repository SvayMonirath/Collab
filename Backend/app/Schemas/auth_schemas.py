from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterInput(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirmPassword: str

class LoginInput(BaseModel):
    # You can use either username or email to login
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: str

