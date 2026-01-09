import type { CreateTeamSchemas } from "../types/teamTypes";
import type { JoinTeamSchemas } from "../types/teamTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createTeam(teamData: CreateTeamSchemas) {
    try {
        const res = await fetch(`${BACKEND_URL}/teams/create`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(teamData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to create team" };
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error("Error creating team:", err);
    }
}

export async function getUserTeams() {
    try {
        const res = await fetch(`${BACKEND_URL}/teams/get_all_teams`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to fetch teams" };
        }

        const data = await res.json();
        console.log("Fetched user all teams:", data);
        return data;

    } catch (err) {
        console.error("Error fetching user all teams:", err);
    }
}

export async function getLatestTeams() {
    try {
        const res = await fetch(`${BACKEND_URL}/teams/get_latest_teams`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to fetch teams"};
        }

        const data = await res.json();
        console.log("Fetched user latest teams:", data);
        return data;

    } catch (err) {
        console.error("Error fetching user latest teams:", err);
    }
}

export async function getTeamById(teamID: string) {

    try {
        // @team_router.get('/get_team/{team_id}')
        const res = await fetch(`${BACKEND_URL}/teams/get_team/${teamID}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to fetch team by ID", status: res.status };
        }

        const data = await res.json();
        return data;

    } catch(err) {
        console.error("Error fetching team by ID:", err);
    }
}

export async function joinTeam(joinData: JoinTeamSchemas) {
    try {
        const res = await fetch(`${BACKEND_URL}/teams/join/${joinData.team_code}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to join team" };
        }

        const data = await res.json();
        return data;

    } catch (err) {
        console.error("Error joining team:", err);
    }
}

