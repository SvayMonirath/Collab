from fastapi import FastAPI

def create_app() -> FastAPI:

    app = FastAPI(title="Collaborative Platform API", version="1.0.0")

    from .Routers import auth_route, team_route

    app.include_router(auth_route.auth_router)
    app.include_router(team_route.team_router)

    return app
