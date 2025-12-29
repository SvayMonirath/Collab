import { useState } from "react";

import { registerUser } from "../api/authAPI";
import { LoginUser } from "../api/authAPI";

import type { LoginTypes } from "../types/loginTypes";
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

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function login(loginData: LoginTypes) {
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await LoginUser(loginData);
        if (response?.error) {
            setError(response.error);
            setLoading(false);

            setTimeout(() => { setError(null); }, 3000);
            return null;
        }

        setLoading(false);
        setMessage("Login successful! Redirecting...");

        const token = response.access_token;

        console.log("Remember Me:", loginData.rememberMe);

        if(loginData.rememberMe) {
            localStorage.setItem("authToken", token);
        } else {
            sessionStorage.setItem("authToken", token);
        }

        // TODO[]: Redirect to Main

        return response;
    }

    return { login, loading, error, message };
}
