import { useSSE } from "../useSSE";

export default function CustomerDashboard() {
    const userId = localStorage.getItem("userId");
    const notification = useSSE(userId);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">Customer Dashboard</h1>
            {console.log ("Notification:", notification)}
            {notification && (
                <div className="bg-green-100 p-3 rounded mt-4">
                    Order {notification.orderId} — {notification.message}
                </div>
            )}

            {/* place order form */}
        </div>
    )
}