import { useEffect, useState, useRef } from "react";

// API
import { getUserToken } from "../api/authAPI";

export const useNotificationWebsocket = () => {
    const [notifications, setNotifications] = useState<any[]>([]);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const initWebsocket = async () => {
            const tokenData = await getUserToken();

            if (!tokenData || tokenData.error) {
                console.error("Failed to get WS token:", tokenData?.error);
                return;
            }

            const token = tokenData.token;

            if (!wsRef.current) {
                const ws = new WebSocket(`ws://localhost:8001/users/ws/notifications?token=${token}`);
                wsRef.current = ws;

                console.log("WS (Notifications): Connection established");

                ws.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    setNotifications((prev) => [...prev, data]);
                    console.log("WS (Notifications): New notification received", data);
                };

                ws.onclose = () => {
                    console.log("WS (Notifications): Connection closed");
                };
            }
        };

        initWebsocket();

        return () => {
            if (wsRef.current) {
                wsRef.current.close();
                wsRef.current = null;
                console.log("WS (Notifications): Connection closed on cleanup");
            }
        };
    }, []);

    return notifications;
};
