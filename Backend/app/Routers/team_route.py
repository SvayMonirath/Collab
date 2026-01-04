from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from ..Database.database import get_db
from ..models import Team, User, user_team_association
from ..Schemas.team_schemas import CreateTeamInput
from ..utils.jwt_helper import get_current_user

team_router = APIRouter(prefix="/teams", tags=["Teams"])

# CRUD OPERATION FOR TEAMS
# --------------- Create Team Endpoint ---------------
@team_router.post('/create')
async def create_team(
    team_input: CreateTeamInput,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")
    current_user = await db.get(User, current_user_id)

    # check if user own a team
    owned_team = await db.execute(
        select(Team).where(
            (Team.title == team_input.title) & (Team.owner_id == current_user_id)
        )
    )


    if owned_team.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="You already own or are a member of a team with this title")

    new_team = Team(
        title=team_input.title,
        description=team_input.description,
        owner=current_user,
    )
    new_team.generate_team_code()

    db.add(new_team)
    await db.commit()
    await db.refresh(new_team)
    return {"message": "Team created successfully", "team_id": new_team.id, "team_code": new_team.code}

# --------------- Delete Team ---------------
@team_router.delete('/delete/{team_id}')
async def delete_team(
    team_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")

    team = await db.get(Team, team_id)
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.owner_id != current_user_id:
        raise HTTPException(status_code=403, detail="You are not the owner of this team")

    await db.delete(team)
    await db.commit()
    return {"message": "Team deleted successfully"}

# ---------------- Join Team ----------------
@team_router.post('/join/{team_code}')
async def join_team(
    team_code: str,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")

    # Fetch the team by code
    team_result = await db.execute(select(Team).where(Team.code == team_code))
    team = team_result.scalar_one_or_none()
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")

    if team.owner_id == current_user_id:
        raise HTTPException(status_code=400, detail="You are the owner of this team")

    # Check if the user is already a member
    membership_result = await db.execute(
        select(user_team_association)
        .where(user_team_association.c.user_id == current_user_id)
        .where(user_team_association.c.team_id == team.id)
    )
    membership = membership_result.first()
    if membership:
        raise HTTPException(status_code=400, detail="You are already a member of this team")

    # Add the user to the team
    await db.execute(
        user_team_association.insert().values(user_id=current_user_id, team_id=team.id)
    )
    await db.commit()

    return {"message": "Joined team successfully"}


# --------------- Get All Owned Team ---------------
@team_router.get('/get_owned_teams')
async def get_owned_teams(
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    current_user_id = current_user.get("user_id")
    result = await db.execute(select(Team).where(Team.owner_id == current_user_id))
    owned_teams = result.scalars().all()

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
    result = await db.execute(
        select(Team).join(user_team_association).where(
            user_team_association.c.user_id == current_user_id
        )
    )
    joined_teams = result.scalars().all()

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
    owned_teams = await db.execute(select(Team).where(Team.owner_id == current_user_id))
    owned_teams = owned_teams.scalars().all()

    joined_teams = await db.execute(
        select(Team).join(user_team_association).where(
            user_team_association.c.user_id == current_user_id
        )
    )
    joined_teams = joined_teams.scalars().all()

    all_teams = owned_teams + joined_teams


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
    owned_teams = await db.execute(
        select(Team).where(Team.owner_id == current_user_id).order_by(Team.create_at.desc()).limit(3)
    )
    owned_teams = owned_teams.scalars().all()

    joined_teams = await db.execute(
        select(Team).join(user_team_association).where(
            user_team_association.c.user_id == current_user_id
        ).order_by(Team.create_at.desc()).limit(3)
    )
    joined_teams = joined_teams.scalars().all()

    all_teams = owned_teams + joined_teams
    # Sort all teams by created_at descending and limit to 3
    all_teams.sort(key=lambda x: x.create_at, reverse=True)
    latest_teams = all_teams[:3]

    print("Latest Teams(route):", latest_teams)

    return {"latest_teams": latest_teams}

@team_router.get('/get_team/{team_id}')
async def get_team_by_id(
    team_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    if current_user is None:
        raise HTTPException(status_code=401, detail="Unauthorized")

    team = await db.execute(select(Team).options(selectinload(Team.members)).where(Team.id == team_id))
    team = team.scalar_one_or_none()
    if team is None:
        raise HTTPException(status_code=404, detail="Team not found")

    user_id = current_user.get("user_id")

    is_owner = team.owner_id == user_id
    is_member = any(member.id == user_id for member in team.members)

    if not is_owner and not is_member:
        raise HTTPException(status_code=403, detail="You are not authorized to view this team")

    return {"team": team}
