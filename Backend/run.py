import os

from dotenv import load_dotenv
from app import create_app

load_dotenv()

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "run:app",     # ← IMPORT STRING (THIS IS THE KEY)
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8001)),
        reload=True
    )
