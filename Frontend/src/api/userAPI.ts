const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCurrentUser() {

    try {
        const res = await fetch(`${BACKEND_URL}/users/me`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!res.ok) {
            throw new Error("Failed to fetch current user");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        return null;
    }
}
