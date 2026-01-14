from ..Repositories.team_repository import TeamRepository
from ..models import Team
from ..Schemas.team_schemas import CreateTeamInput

class TeamService:
    def __init__(self, repo: TeamRepository):
        self.repo = repo


    async def create_team(self, team_input: CreateTeamInput, owner_id: int) -> Team:
        owned_team = await self.repo.get_owned_team_by_title(team_input.title, owner_id)
        if owned_team:
            raise ValueError("You already own or are a member of a team with this title")

        new_team = Team(
            title=team_input.title,
            description=team_input.description,
            owner_id=owner_id
        )
        new_team.generate_team_code()
        return await self.repo.save(new_team)

    async def join_team_by_code(self, code: str, user_id: int) -> Team:
        team = await self.repo.get_by_code(code)

        if team is None:
            raise LookupError("Team not found")

        if self.repo.is_owner(team, user_id):
            raise ValueError("You cannot join your own team")

        user = await self.repo.get_user_by_id(user_id)

        if  self.repo.is_member(team, user_id):
            raise ValueError("You are already a member of this team")

        await self.repo.save_to_association(user, team)
        return team

    async def delete_team(self, team_id: int, owner_id: int) -> None:
        team = await self.repo.get_by_id(team_id)
        if team is None:
            raise LookupError("Team not found")

        if not self.repo.is_owner(team, owner_id):
            raise PermissionError("You are not the owner of this team")

        await self.repo.delete_team(team)

    async def get_owned_teams(self, owner_id: int) -> list[Team]:
        return await self.repo.get_owned_teams(owner_id)

    async def get_team_by_id(self, team_id: int, user_id: int) -> dict:
        team = await self.repo.get_by_id(team_id)

        owner_access = team and self.repo.is_owner(team, user_id)
        member_access = team and self.repo.is_member(team, user_id)

        if not owner_access and not member_access:
            raise PermissionError("You do not have access to this team")

        member_count = len(team.members) if team else 0

        team_data = {
            "team_id": team.id,
            "title": team.title,
            "description": team.description,
            "code": team.code,
            "owner_id": team.owner_id,
            "member_count": member_count
        }
        return team_data

    async def get_joined_teams(self, user_id: int) -> list[Team]:
        return await self.repo.get_joined_teams(user_id)

    async def get_all_teams(self, user_id: int) -> list[Team]:
        return await self.repo.get_all_teams_of_user(user_id=user_id)

    # Non-default argument follows default argumentPylance
    async def get_latest_teams(self, user_id: int,limit: int = 3) -> list[Team]:
        return await self.repo.get_latest_teams(limit=limit, user_id=user_id)
