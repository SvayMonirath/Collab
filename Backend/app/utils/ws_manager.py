from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List

from ..Services.meeting_service import _init_meeting_state
from ..Repositories.meeting_repository import MeetingRepository

class MeetingConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, meeting_id: int):
        await websocket.accept()
        if meeting_id not in self.active_connections:
            self.active_connections[meeting_id] = []
        self.active_connections[meeting_id].append(websocket)

    def disconnect(self, websocket: WebSocket, meeting_id: int):
        if meeting_id in self.active_connections:
            self.active_connections[meeting_id].remove(websocket)
            if not self.active_connections[meeting_id]:
                del self.active_connections[meeting_id]

    async def broadcast(self, meeting_id: int, message: str):
        if meeting_id in self.active_connections:
            for connection in self.active_connections[meeting_id]:
                await connection.send_text(message)

    async def broadcast_participants_update(self, meeting_id: int):
        meeting = _init_meeting_state(meeting_id)
        active_connection = self.active_connections.get(meeting_id, [])
        count = len(active_connection)
        for connection in active_connection:
            await connection.send_json({"type": "participants_update", "count": count, "participants": meeting["participants"]})


meeting_manager = MeetingConnectionManager()

class TeamConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, team_id: int):
        await websocket.accept()
        if team_id not in self.active_connections:
            self.active_connections[team_id] = []
        self.active_connections[team_id].append(websocket)

    def disconnect(self, websocket: WebSocket, team_id: int):
        if team_id in self.active_connections:
            self.active_connections[team_id].remove(websocket)
            if not self.active_connections[team_id]:
                del self.active_connections[team_id]

    async def broadcast(self, team_id: int, message: str):
        if team_id in self.active_connections:
            for connection in self.active_connections[team_id]:
                await connection.send_text(message)

    async def broadcast_active_meeting_update(self, team_id: int, data: dict):
        active_connection = self.active_connections.get(team_id, [])

        for connection in active_connection:
            await connection.send_json({"type": "active_meeting_update", "data": data})

team_manager = TeamConnectionManager()
