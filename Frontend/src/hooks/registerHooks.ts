import { useState } from "react";

import { registerUser } from "../api/registerAPI";
import type { RegisterTypes } from "../types/registerTypes";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function register(userData: RegisterTypes) {
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await registerUser(userData);

        if (response?.error) {
            setError(response.error);
            setLoading(false);

            setTimeout(() => { setError(null); }, 3000);
            return null;
        }

        setLoading(false);
        setMessage("Registration successful! You can now log in.");
        setTimeout(() => { setMessage(null); }, 3000);

        return response;
    }

    return { register, loading, error, message };
}
