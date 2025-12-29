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
