import {  useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// TYPES
import type { CreateMeetingSchemas } from "../types/meetingTypes";

// API
import { createMeeting, getMeetingByID, getMeetingState, joinMeeting, leaveMeeting } from "../api/meetingAPI";
import { getTeamMeetings } from "../api/meetingAPI";
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

        const response = await leaveMeeting(meetingID, teamID);

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

export function useParticipantCountWebSocket(meetingID: string) {
    const [participantCount, setParticipantCount] = useState<number>(0);
    const [participants, setParticipants] = useState<any[]>([]);

    useEffect(() => {
        // Correct URL with router prefix
        const ws = new WebSocket(`ws://localhost:8001/meetings/ws/audio/${meetingID}`);

        ws.onopen = () => {
            console.log("WebSocket connection established");
            ws.send("join");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "participants_update") {
                setParticipantCount(data.count);
                setParticipants(data.participants);
                console.log("Participant Count Updated:", data.count);
                console.log("Participants List:", data.participants);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, [meetingID]);

    return { participantCount, participants };
}


export function useLatestActiveMeetingWS(teamID: string) {
    const [latestActiveMeeting, setLatestActiveMeeting] = useState<any | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8001/meetings/ws/Team/${teamID}`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection for latest active meeting established");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === "active_meeting_update") {
                console.log("Latest Active Meeting Updated:", data);
                setLatestActiveMeeting(data.data.payload);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket connection for latest active meeting closed");
        };

        return () => {
            if(wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
            }
        };
    }, [teamID]);

    const startMeeting = () => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send("start_meeting");
        } else {
            console.warn("WebSocket not connected");
        }
    };

    return {
        latestActiveMeeting,
        startMeeting,
    };
}

