import { useState, useEffect } from "react";

import { createTeam } from "../api/teamAPI";
import { getUserTeams } from "../api/teamAPI";

import type { CreateTeamSchemas } from "../types/teamTypes";

export function useCreateTeam() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function create(teamData: CreateTeamSchemas) {
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await createTeam(teamData);

        if (response?.error) {
            setError(response.error);
            setLoading(false);

            setTimeout(() => { setError(null); }, 3000);
            return null;
        }

        setLoading(false);
        setMessage("Team created successfully!");
        setTimeout(() => { setMessage(null); }, 3000);

        return response;
    }

    return { create, loading, error, message };
}

export function useUserTeams() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getUserTeams();
                if (res?.error) {
                    setError(res.error);
                } else {
                    setTeams(res.all_teams || []);
                }
            } catch{
                setError("Failed to fetch teams.");
            }

            setLoading(false);
        };

        fetchTeams();
    }, [])

    return { teams, loading, error };
}
