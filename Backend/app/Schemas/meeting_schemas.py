from pydantic import BaseModel
from typing import Optional

class MeetingCreateSchema(BaseModel):
    title: str
