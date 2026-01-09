import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// TYPES
import type { CreateMeetingSchemas } from "../types/meetingTypes";

// API
import { createMeeting, getMeetingByID, getMeetingState, joinMeeting, leaveMeeting } from "../api/meetingAPI";
import { getTeamMeetings } from "../api/meetingAPI";
import { TeamHome } from "../pages/TeamsPages/TeamHome";
import { MeetingAudioCallPageUrl, TeamHomeUrl } from "../urlPath";

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
        navigate(`${MeetingAudioCallPageUrl}/${response.meeting_id}`);


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

    // Polling for meetings every 10 seconds (Later can be replaced with WebSocket)
    useEffect(() => {
        async function refreshMeetings() {
            const response = await getTeamMeetings(teamID);

            if (response?.error) {
                setError(response.error);
                return;
            }

            setMeetings(response.meetings);
        }

        const interval = setInterval(() => {
            refreshMeetings();
        }, 10000);
        return () => clearInterval(interval);
    }, [teamID]);

    const activeMeeting = meetings.find((meeting) => meeting.status === "active");
    console.log("Active Meeting:", activeMeeting);

    return { meetings, activeMeeting, loading, error };

}

export function useMeetingByID(meetingID: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [meeting, setMeeting] = useState<any | null>(null);
    const [meetingState, setMeetingState] = useState<any | null>(null);

    useEffect(() => {
        async  function loadMeeting(meetingID: string) {
            setLoading(true);
            setError(null);

            const response = await getMeetingByID(meetingID);

            if (response?.error) {
                setError(response.error);
                setLoading(false);
                return;
            }

            setMeeting(response.meeting);
            setLoading(false);
        }
        async function loadMeetingState(meetingID: string) {
            setLoading(true);
            setError(null);

            const response = await getMeetingState(meetingID);

            if (response?.error) {
                setError(response.error);
                setLoading(false);
                return;
            }

            setMeetingState(response.meeting_state);
            setLoading(false);
        }
        loadMeeting(meetingID);
        loadMeetingState(meetingID);

    }, [meetingID]);

    console.log("Meeting from hook:", meeting);
    console.log("Meeting State from hook:", meetingState);

    return { meeting, meetingState, loading, error };
}

export function useJoinMeeting(meetingID: string) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function join() {
        setLoading(true);
        setError(null);

        const response = await joinMeeting(meetingID);

        if (response?.error) {
            setError(response.error);
            setLoading(false);
            return;
        }

        setLoading(false);
        navigate(`${MeetingAudioCallPageUrl}/${meetingID}`);
        return response;
    }

    return { join, loading, error };
}

export function useLeaveMeeting(meetingID: string, teamID: string) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function leave() {
        setLoading(true);
        setError(null);

        const response = await leaveMeeting(meetingID);

        if (response?.error) {
            setError(response.error);
            setLoading(false);
            return;
        }

        setLoading(false);
        navigate(`${TeamHomeUrl}/${teamID}`);
        return response;
    }

    return { leave, loading, error };
}
