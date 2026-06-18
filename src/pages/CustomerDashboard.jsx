import { useSSE } from "../useSSE";

export default function CustomerDashboard() {
    const userId = localStorage.getItem("userId");
    const notification = useSSE(userId);
    const statusConfig = {
        Confirmed: { dot: 'bg-blue-500', pill: 'bg-blue-50   text-blue-800   border-blue-200' },
        Preparing: { dot: 'bg-amber-400', pill: 'bg-amber-50  text-amber-900  border-amber-300' },
        Ready: { dot: 'bg-green-500', pill: 'bg-green-50  text-green-800  border-green-200' },
        Delivered: { dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        Cancelled: { dot: 'bg-red-500', pill: 'bg-red-50    text-red-800    border-red-200' },
    };

    const timeAgo = (dateStr) => {
        const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
        return `${Math.floor(diff / 3600)} hr ago`;
    };

return(
    <div className="p-6 max-w-xl">
        <h1 className="text-xl font-medium mb-1">Your Orders</h1>
        {notification?.length > 0 && (
            <p className="text-sm text-gray-400 mb-4">{notification.length} updates</p>
        )}

        <div className="flex flex-col gap-3">
            {notification?.map((msg, index) => {
                const config = statusConfig[msg.status] ?? statusConfig.Confirmed;
                return (
                    <div key={index}
                        className="bg-white border border-gray-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Order #{msg.orderId}</span>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium
                              px-2.5 py-1 rounded-full border ${config.pill}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                                {msg.status}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                {msg.status === 'Delivered' && 'Your order has been delivered. Enjoy!'}
                                {msg.status === 'Preparing' && 'Your order is being prepared.'}
                                {msg.status === 'Cancelled' && 'This order was cancelled.'}
                                {msg.status === 'Confirmed' && 'Your order has been confirmed.'}
                                {msg.status === 'Ready' && 'Your order is ready for pickup.'}
                            </p>
                            {msg.lastUpdated && (
                                <span className="text-xs text-gray-400 shrink-0 ml-4">
                                    {timeAgo(msg.lastUpdated)}
                                </span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
)}