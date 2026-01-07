import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

def create_app() -> FastAPI:

    app = FastAPI(title="Collaborative Platform API", version="1.0.0")

    origin = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origin,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    from .Routers import auth_route, team_route, user_route, meeting_route

    app.include_router(auth_route.auth_router)
    app.include_router(team_route.team_router)
    app.include_router(user_route.user_router)
    app.include_router(meeting_route.meeting_router)

    return app
