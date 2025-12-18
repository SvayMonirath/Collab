from fastapi import FastAPI

def create_app() -> FastAPI:

    app = FastAPI(title="Collaborative Platform API", version="1.0.0")

    return app 
