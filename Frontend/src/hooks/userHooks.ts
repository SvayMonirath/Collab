import  { useState, useEffect } from "react";

import { getCurrentUser } from "../api/userAPI";

export function useCurrentUser() {
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getCurrentUser();
                if (res) {
                    setUser(res);
                } else {
                    setError("Failed to fetch user.");
                }
            } catch {
                setError("Failed to fetch user.");
            }

            setLoading(false);
        };

        fetchUser();

    }, []);

    return { user, loading, error, refetch: async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await getCurrentUser();
            if (res) {
                setUser(res);
            } else {
                setError("Failed to fetch user.");
            }
        } catch {
            setError("Failed to fetch user.");
        }

        setLoading(false);
    } };
}
