import random
import string

from sqlalchemy import (
    Column,
    Integer,
    String,
    ForeignKey,
    Table
)
from sqlalchemy.orm import relationship

from .Database.database import Base
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# ======================================================
# Association Table (User <-> Team Membership)
# ======================================================
user_team_association = Table(
    "user_team_association",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("team_id", Integer, ForeignKey("teams.id"), primary_key=True),
)

# ======================================================
# User Model
# ======================================================
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hash_password = Column(String(128), nullable=False)

    # Teams this user OWNS
    owned_teams = relationship(
        "Team",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

    # Teams this user is a MEMBER of
    teams = relationship(
        "Team",
        secondary=user_team_association,
        back_populates="members"
    )

    def set_password(self, password: str):
        self.hash_password = pwd_context.hash(password)

    def verify_password(self, password: str) -> bool:
        return pwd_context.verify(password, self.hash_password)

# ======================================================
# Team Model
# ======================================================
class Team(Base):
    __tablename__ = "teams"
    id = Column(Integer, primary_key=True)
    title = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)
    code = Column(String, unique=True, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    owner = relationship("User", back_populates="owned_teams")
    members = relationship("User", secondary=user_team_association, back_populates="teams")

    def generate_team_code(self, length: int = 10) -> str:
        characters = string.ascii_letters + string.digits
        self.code = ''.join(random.choice(characters) for _ in range(length))

