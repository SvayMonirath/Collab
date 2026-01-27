from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_
from sqlalchemy.orm import selectinload
from ..models import Team, User, user_team_association

class TeamRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, team_id: int) -> Team | None:
        result = await self.db.execute(
            select(Team).where(Team.id == team_id).options(selectinload(Team.members))
        )
        return result.scalar_one_or_none()

    async def get_owned_teams(self, owner_id: int) -> list[Team]:
        result = await self.db.execute(
            select(Team).where(Team.owner_id == owner_id)
        )
        return result.scalars().all()

    async def get_joined_teams(self, user_id: int) -> list[Team]:
        result = await self.db.execute(
            select(Team).join(user_team_association).where(
                user_team_association.c.user_id == user_id
            )
        )
        result = result.scalars().all()
        return result

    async def get_all_teams_of_user(self, user_id: int) -> list[Team]:
        owned_teams_result = await self.db.execute(select(Team).where(Team.owner_id == user_id))
        owned_teams = owned_teams_result.scalars().all()

        owned_teams_datas = [
            {
                "team_id": team.id,
                "title": team.title,
                "description": team.description,
                "owner_id": team.owner_id,
            } for team in owned_teams
        ]

        joined_teams_result = await self.db.execute(
            select(Team).join(user_team_association).where(
                user_team_association.c.user_id == user_id
            )
        )


        # get member counts for each team
        joined_teams = joined_teams_result.scalars().all()
        joined_teams_data = [
            {
                "team_id": team.id,
                "title": team.title,
                "description": team.description,
                "owner_id": team.owner_id,
            } for team in joined_teams
        ]
        all_teams = owned_teams_datas + joined_teams_data
        return all_teams

    async def get_latest_teams(self, user_id: int, limit: int = 3) -> list[Team]:
        joined_teams_result = await self.db.execute(
            select(Team).join(user_team_association).where(
                user_team_association.c.user_id == user_id
            ).order_by(Team.id.desc()).limit(limit)
        )
        return joined_teams_result.scalars().all()


    async def get_by_code(self, code: str) -> Team | None:
        result = await self.db.execute(
            select(Team).where(Team.code == code).options(selectinload(Team.members))
        )
        return result.scalar_one_or_none()

    async def delete_team(self, team: Team) -> None:
        await self.db.delete(team)
        await self.db.commit()

    async def get_owned_team_by_title(self, title: str, owner_id: int) -> Team | None:
        result = await self.db.execute(
            select(Team).where((Team.title == title) & (Team.owner_id == owner_id))
        )
        return result.scalar_one_or_none()

    async def get_user_by_id(self, user_id: int) -> User | None:
        result = await self.db.execute(
            select(User).where(User.id == user_id)
        )
        return result.scalar_one_or_none()

    async def save_to_association(self, user: User, team: Team) -> None:
        team.members.append(user)
        await self.db.commit()

    def is_owner(self, team: Team, user_id: int) -> bool:
        return team.owner_id == user_id

    def is_member(self, team: Team, user_id: int) -> bool:
        return any(member.id == user_id for member in team.members)

    async def save(self, team: Team) -> Team:
        self.db.add(team)
        await self.db.commit()
        await self.db.refresh(team)
        return team
