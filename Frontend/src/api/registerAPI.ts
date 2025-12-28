import type { RegisterTypes } from "../types/registerTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function registerUser(userData: RegisterTypes) {
    console.log("URL:", BACKEND_URL);
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
