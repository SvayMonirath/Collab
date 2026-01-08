import type { CreateMeetingSchemas } from "../types/meetingTypes";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createMeeting(teamID: string, meetingData: CreateMeetingSchemas) {
    /*
        Goal: Start a meeting for a team
        Conditions: Only team owner and team member can start a meeting
    */
    try {
        const res = await fetch(`${BACKEND_URL}/meetings/start/${teamID}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(meetingData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to create meeting" };
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error creating meeting:", err);
        return { error: "An unexpected error occurred" };
    }
}

export async function getTeamMeetings(teamID: string) {
    /*
        Goal: Get all meetings for a team
        Conditions: Only team members can view meetings
    */

    try {
        const res = await fetch(`${BACKEND_URL}/meetings/get_meetings/team/${teamID}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to fetch meetings" };
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching team meetings:", err);
        return { error: "An unexpected error occurred" };
    }
}

export async function getMeetingByID(meetingID: string) {
    /*
        Goal: Get a specific meeting by its ID
        Conditions: Only team members can view the meeting
    */

        try {
            const res = await fetch(`${BACKEND_URL}/meetings/get_meeting/${meetingID}`, {
                method: "GET",
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { error: errorData.detail || "Failed to fetch meeting" };
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Error fetching meeting by ID:", err);
            return { error: "An unexpected error occurred" };
        }
}

export async function getMeetingState(meetingID: string) {
    /*
        Goal: Get the current state of a meeting
        Conditions: Only team members can view the meeting state
    */

    try {
        const res = await fetch(`${BACKEND_URL}/meetings/state/${meetingID}`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { error: errorData.detail || "Failed to fetch meeting state" };
        }

        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error fetching meeting state:", err);
        return { error: "An unexpected error occurred" };
    }
}

export async function joinMeeting(meetingID: string) {
    /*
        Goal: Join a meeting
        Conditions: Only team members can join the meeting
    */

        try {
            const res = await fetch(`${BACKEND_URL}/meetings/join/${meetingID}`, {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { error: errorData.detail || "Failed to join meeting" };
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Error joining meeting:", err);
            return { error: "An unexpected error occurred" };
        }
}

export async function leaveMeeting(meetingID: string) {
    /*
        Goal: Leave a meeting
        Conditions: Only team members can leave the meeting
    */

        try {
            const res = await fetch(`${BACKEND_URL}/meetings/leave/${meetingID}`, {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { error: errorData.detail || "Failed to leave meeting" };
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Error leaving meeting:", err);
            return { error: "An unexpected error occurred" };
        }
}

export async function endMeeting(meetingID: string) {
    /*
        Goal: End a meeting
        Conditions: Only the meeting host can end the meeting
    */

        try {
            const res = await fetch(`${BACKEND_URL}/meetings/end/${meetingID}`, {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { error: errorData.detail || "Failed to end meeting" };
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error("Error ending meeting:", err);
            return { error: "An unexpected error occurred" };
        }
}
