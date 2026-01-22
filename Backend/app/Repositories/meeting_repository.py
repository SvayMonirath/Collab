from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from ..models import Meeting

class MeetingRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, meeting_id: int) -> Meeting | None:
        result = await self.db.execute(
            select(Meeting).where(Meeting.id == meeting_id).options(selectinload(Meeting.team))
        )
        return result.scalar_one_or_none()

    async def get_meetings_by_team_id(self, team_id: int) -> list[Meeting]:
        result = await self.db.execute(
            select(Meeting).where(Meeting.team_id == team_id).order_by(Meeting.started_at.desc())
        )
        return result.scalars().all()

    async def get_latest_active_meeting_by_team_id(self, team_id: int) -> Meeting | None:
        result = await self.db.execute(
            select(Meeting)
            .where(Meeting.team_id == team_id, Meeting.status == "active")
            .order_by(Meeting.started_at.desc())
        )
        return result.scalars().first()


    async def save(self, meeting: Meeting) -> Meeting:
        self.db.add(meeting)
        await self.db.commit()
        await self.db.refresh(meeting)
        return meeting

    async def update(self, meeting: Meeting) -> Meeting:
        await self.db.commit()
        await self.db.refresh(meeting)
        return meeting

