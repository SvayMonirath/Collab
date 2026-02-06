# SAMAKI Documentation

#### Tech Stack:
- Frontend: React, TypeScript, Tailwind CSS
- Backend: FastAPI, Python
- Database: PostgreSQL with SQLAlchemy
- Real-time Communication: WebRTC, WebSockets

#### Project Pages:
* Landing Page
* User Authentication (Login, Register)
* Main Page (Home, Teams, Profile, Settings, Notifications, Global Calendar)
* Team Page (Team Home, Team Settings, Members, Team Calendar )
* Meeting Audio Call Page


### Implementation Overview

#### Authentication (JWT + HTTP-Only Cookies)

**Flow:**
1. **Register:** Create user with hashed password.
2. **Login:** Validate credentials → generate JWT → store in HTTP-only cookie.
3. **Protected Routes:** Backend checks JWT from cookie for authentication.
4. **Logout:** Delete JWT cookie.

**Key Points:**
- Passwords hashed with `bcrypt`.
- Tokens expire automatically; optional **Remember Me** extends duration.
- Cookies: `httponly=True`, `secure=True`, `samesite=lax`.

```python
# Set HTTP-only cookie on login
response.set_cookie(
    key="accessToken",
    value=token,
    httponly=True,
    secure=True,
    samesite="lax"
)
# Read cookie in protected route
token = request.cookies.get("accessToken")
```

<!-- logout  -->
```python
# Delete cookie on logout
response.delete_cookie(key="accessToken")
```

#### Websocket (Real-time Notifications)
**Flow:**
1. Client connects to WebSocket endpoint **Note: Endpoint is only called when component mounts**
2. Server authenticates to get user ID using provided JWT token called from the server using a route **Note: Websocket endpoints does not support Dependency Injection, handle this by createa function that return what ever things you want instead**
3. Server adds client to a connection manager pool
4. When an event occurs (e.g., meeting starts), Server will use team_id to find all members and send notifications to their respective WebSocket connections.
5. Client recieves notification and updates UI in real-time.
