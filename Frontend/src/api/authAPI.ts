import type { RegisterTypes } from "../types/registerTypes";
import type { LoginTypes } from "../types/loginTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function registerUser(userData: RegisterTypes) {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        const data = await res.json();

        console.log("Registration response:", data);

        if (!res.ok) {
            return { error: data.detail };
        }

        return data;

    } catch(err) {
        console.error("Registration failed:", err);
    }

}

export async function LoginUser(loginData: LoginTypes) {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await res.json();

        console.log("Login response:", data);

        if (!res.ok) {
            return { error: data.detail };
        }

        return data;

    } catch(err) {
        console.error("Login failed:", err);
    }
}

export async function LogoutUser() {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        console.log("Logout response:", data);

        if (!res.ok) {
            return { error: data.detail };
        }

        return data;
    } catch(err) {
        console.error("Logout failed:", err);
        return { error: "Logout failed" };
    }
}

export async function checkAuthStatus() {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/status`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        console.log("Auth status response:", data);

        if (!res.ok) {
            return { error: data.detail || "Failed to check auth status" };
        }

        return data;

    } catch(err) {
        console.error("Check auth status failed:", err);
        return { error: "Check auth status failed" };
    }
}

export async function getUserToken() {
    try {
        const res = await fetch(`${BACKEND_URL}/auth/ws_token`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();

        console.log("Get WS token response:", data);

        if (!res.ok) {
            return { error: data.detail || "Failed to get WebSocket token" };
        }

        return data;
    } catch(err) {
        console.error("Get WebSocket token failed:", err);
        return { error: "Get WebSocket token failed" };
    }
}
