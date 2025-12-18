from sqlalchemy import Column, Integer, String
from .Database.database import Base
from pwdlib import PasswordHash

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hash_password = Column(String(128), nullable=False)

    def set_password(self, password: str):
        self.hash_password = PasswordHash.hash(password)

    def verify_password(self, password: str) -> bool:
        return PasswordHash.verify(self.hash_password, password)
