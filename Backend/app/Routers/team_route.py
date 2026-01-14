from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from ..Database.database import get_db
from ..models import Team, User, user_team_association
from ..Schemas.team_schemas import CreateTeamInput
from ..utils.jwt_helper import get_current_user

from ..Services.team_service import TeamService
from ..Repositories.team_repository import TeamRepository

team_router = APIRouter(prefix="/teams", tags=["Teams"])

# CRUD OPERATION FOR TEAMS
# --------------- Create Team Endpoint ---------------
@team_router.post('/create')
async def create_team(
    team_input: CreateTeamInput,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        team_repo = TeamRepository(db)
        team_service = TeamService(team_repo)
        if current_user is None:
            raise HTTPException(status_code=401, detail="Unauthorized")

        user_id = current_user.get("user_id")

        await team_service.create_team(team_input, user_id)
        return {"message": "Team created successfully"}
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))



# --------------- Delete Team ---------------
@team_router.delete('/delete/{team_id}')
async def delete_team(
    team_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    try:
        team_repo = TeamRepository(db)
        team_service = TeamService(team_repo)
        if current_user is None:
            raise HTTPException(status_code=401, detail="Unauthorized")

        current_user_id = current_user.get("user_id")
        await team_service.delete_team(team_id, current_user_id)
        return {"message": "Team deleted successfully"}
    except LookupError as le:
        raise HTTPException(status_code=404, detail=str(le))
    except PermissionError as pe:
        raise HTTPException(status_code=403, detail=str(pe))

# ---------------- Join Team ----------------
@team_router.post('/join/{team_code}')
async def join_team(
    team_code: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
        Goal: Allow a user to join a team using a team code
        Conditions: User cannot be the owner of the team and cannot already be a member
    """
    try:
        team_repo = TeamRepository(db)
        team_service = TeamService(team_repo)
        if current_user is None:
            raise HTTPException(status_code=401, detail="Unauthorized")

        current_user_id = current_user.get("user_id")
        team = await team_service.join_team_by_code(team_code, current_user_id)

        return {"message": "Successfully joined the team", "team_id": team.id}
    except LookupError as le:
        raise HTTPException(status_code=404, detail=str(le))
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))


# --------------- Get All Owned Team ---------------
@team_router.get('/get_owned_teams')
async def get_owned_teams(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    team_repo = TeamRepository(db)
    team_service = TeamService(team_repo)
    current_user_id = current_user.get("user_id")
    owned_teams = await team_service.get_owned_teams(current_user_id)
    return {"owned_teams": owned_teams}


# --------------- Get Joined Teams ---------------
@team_router.get('/get_joined_teams')
async def get_joined_teams(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")
    team_repo = TeamRepository(db)
    team_service = TeamService(team_repo)
    joined_teams = await team_service.get_joined_teams(current_user_id)

    return {"joined_teams": joined_teams}

# --------------- Get all Team associated to User ---------------
@team_router.get('/get_all_teams')
async def get_all_teams(
    db: AsyncSession = Depends(get_db),
    # JWT Required
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")
    team_repo = TeamRepository(db)
    team_service = TeamService(team_repo)
    all_teams = await team_service.get_all_teams(user_id=current_user_id)

    return {"all_teams": all_teams}

# --------------- Get the 3 latest Team associated to User ---------------
@team_router.get('/get_latest_teams')
async def get_latest_teams(
    db: AsyncSession = Depends(get_db),
    # JWT Required
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")
    team_repo = TeamRepository(db)
    team_service = TeamService(team_repo)
    latest_teams = await team_service.get_latest_teams(limit=3, user_id=current_user_id)

    return {"latest_teams": latest_teams}

@team_router.get('/get_team/{team_id}')
async def get_team_by_id(
    team_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
        Goal: Fetch a team by its ID
        Conditions: user must be either the owner or a member of the team
    """
    try:
        if current_user is None:
            raise HTTPException(status_code=401, detail="Unauthorized")

        user_id = current_user.get("user_id")

        team_repo = TeamRepository(db)
        team_service = TeamService(team_repo)
        team_data = await team_service.get_team_by_id(team_id, user_id)
        return {"team": team_data}
    except PermissionError as pe:
        raise HTTPException(status_code=403, detail=str(pe))
    except LookupError as le:
        raise HTTPException(status_code=404, detail=str(le))
