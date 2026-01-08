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
