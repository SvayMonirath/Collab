import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createTeam, getUserTeams } from "../api/teamAPI";
import { getLatestTeams } from "../api/teamAPI";
import { joinTeam } from "../api/teamAPI";
import { getTeamById } from "../api/teamAPI";

import type { CreateTeamSchemas } from "../types/teamTypes";
import type { JoinTeamSchemas } from "../types/teamTypes";

// Path URL
import { MainHomeUrl } from "../urlPath";

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

export function useUserLatestTeams() {
    const [teams, setTeams] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTeams = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getLatestTeams();
                if (res?.error) {
                    setError(res.error);
                } else {
                    setTeams(res.latest_teams || []);
                }
            } catch{
                setError("Failed to fetch teams.");
            }

            setLoading(false);
        };

        fetchTeams();
    }, [])

    return { teams, loading, error, refetch: async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await getLatestTeams();
            if (res?.error) {
                setError(res.error);
            } else {
                setTeams(res.latest_teams || []);
            }
        } catch{
            setError("Failed to fetch teams.");
        }

        setLoading(false);
    } };
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

    return { teams, loading, error, refetch: async () => {
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
    } };
}

export function useTeamById(teamID: string) {
    const [team, setTeam] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!teamID) return;

        const fetchTeam = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await getTeamById(teamID);
                if (res?.error) {
                    if (res.status === 403) {
                        navigate(MainHomeUrl, { state: { error: "You are not authorized to view this team." } });
                    }
                    setError(res.error);
                } else {
                    setTeam(res.team || null);
                }

            } catch {
                setError("Failed to fetch team.");
            }

            setLoading(false);
        }
        fetchTeam();
    }, [teamID, navigate]);

    console.log("Team from hook:", team);

    return { team, loading, error };
}

export function useJoinTeam() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function join(joinData: JoinTeamSchemas) {
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await joinTeam(joinData);

        if (response?.error) {
            setError(response.error);
            setLoading(false);

            setTimeout(() => { setError(null); }, 3000);
            return null;
        }

        setLoading(false);
        setMessage("Joined team successfully!");
        setTimeout(() => { setMessage(null); }, 3000);

        return response;
    }

    return { join, loading, error, message };
}
