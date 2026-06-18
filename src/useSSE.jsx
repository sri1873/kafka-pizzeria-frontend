// hooks/useSSE.js
import { useEffect, useState } from "react";

export function useSSE(userId) {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        if (!userId) return;

        const es = new EventSource(
            `http://localhost:8080/subscribe/${userId}`
        );

        es.addEventListener("order-update", (e) => {
            setNotification(prev => [...prev, JSON.parse(e.data)]);
        });

        return () => es.close();
    }, [userId]);

    return notification;
}