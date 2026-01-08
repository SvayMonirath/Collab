import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TYPES
import type { CreateMeetingSchemas } from "../types/meetingTypes";

// API
import { createMeeting } from "../api/meetingAPI";
import { getTeamMeetings } from "../api/meetingAPI";

export function useCreateMeeting() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    async function createNewMeeting(teamID: string, meetingData: CreateMeetingSchemas) {
        setLoading(true);
        setError(null);
        setMessage(null);

        const response = await createMeeting(teamID, meetingData);

        if (response?.error) {
            setError(response.error);
            setLoading(false);

            setTimeout(() => { setError(null); }, 3000);
            return null;
        }

        setLoading(false);
        navigate(`/meeting/${response.meeting_id}`);


        return response;
    }

    return { createNewMeeting, loading, error, message };
}

export  function useActiveMeeting(teamID: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [meetings, setMeetings] = useState<any[]>([]);

    useEffect(() => {
        async  function loadMeeting() {
            setLoading(true);
            setError(null);

            const response = await getTeamMeetings(teamID);

            if (response?.error) {
                setError(response.error);
                setLoading(false);
                return;
            }

            setMeetings(response.meetings);
            setLoading(false);
        }
        loadMeeting();

    }, [teamID]);

    const activeMeeting = meetings.find((meeting) => meeting.status === "active");
    console.log("Active Meeting:", activeMeeting);

    return { meetings, activeMeeting, loading, error };

}
