from fastapi import WebSocket, WebSocketDisconnect
from typing import Dict, List

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
        count = len(self.active_connections.get(meeting_id, []))
        for connection in self.active_connections.get(meeting_id, []):
            await connection.send_json({"type": "participants_update", "count": count})

meeting_manager = MeetingConnectionManager()
