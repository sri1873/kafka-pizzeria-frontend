import axios from "axios";
import { useEffect, useState } from "react";
import { useSSE } from "../useSSE";


const TABS = { "PLACED": "PLACED", "PREPARING": "ORDER_ACCEPTED", "READY": "READY_FOR_PICKUP", "DELIVERED": "DELIVERED" };
const STATUS_FLOW = { PLACED: "ORDER_ACCEPTED", ORDER_ACCEPTED: "READY_FOR_PICKUP", READY: "DELIVERED" };

const PILL = {
  PLACED: "bg-amber-50  text-amber-900  border-amber-300",
  PREPARING: "bg-blue-50   text-blue-900   border-blue-200",
  READY: "bg-green-50  text-green-800  border-green-200",
  DELIVERED: "bg-gray-100  text-black-500   border-gray-200",
};

export default function RestaurantDashboard() {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("PLACED");


  const userId = localStorage.getItem("userId");
  const notification = useSSE(userId, "http://localhost:8080/restaurant/events");


  useEffect(() => {
    if (notification.length === 0) return;
    if (activeTab === "PLACED") {
      setOrders(prev => [notification[0]?.orderDetails, ...prev]);

    }
    console.log("Received notification:", notification[0]?.orderDetails);
  }, [notification]);

  useEffect(() => {
    axios.get("http://localhost:8080/restaurant/orders?status=" + TABS[activeTab])
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }, [activeTab]);

  const updateStatus = (orderId) => {
    const order = orders.find(o => o.orderId === orderId);
    const nextStatus = STATUS_FLOW[order.status];
    console.log(nextStatus);
    console.log(order.status);

    axios.put("http://localhost:8080/restaurant/update/orderstatus",
      { orderId, userId: order.user.userId, status: nextStatus })
      .then(response => {
        setOrders(prev => prev.filter(o => o.orderId !== orderId)); 
      })
      .catch(error => {
        console.error("Error updating order status:", error);
      });
  };


  return (
    <div className="p-6 min-h-[90vh]">
      <div className="flex gap-1 border-b border-gray-100 mb-6">
        {Object.keys(TABS).map(tab => (
          <button key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors capitalize
              ${activeTab === tab
                ? "border-[#CF2101] text-black-900"
                : "border-transparent text-black-400 hover:text-black-600"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-black-400 uppercase tracking-wide">
            <th className="text-center pb-3 font-medium">Order</th>
            <th className="text-center pb-3 font-medium">Items</th>
            <th className="text-center pb-3 font-medium">Time</th>
            <th className="text-center pb-3 font-medium">Status</th>
            {activeTab !== "DELIVERED" && (
              <th className="text-center pb-3 font-medium">Action</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {orders.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-12 text-black-400">
              No {activeTab} orders
            </td></tr>
          ) : orders.map(order => (
            <tr key={order.orderId}>
              <td className="py-3 font-medium">#{order.orderId}</td>
              <td className="py-3 text-black-600">
                {order.items.map((item) => (
                  <div key={item.item} className={order.items.indexOf(item) > 0 ? "text-xs text-black-400" : ""}>{item.item} x{item.quantity}</div>
                ))}
              </td>
              <td className="py-3 text-black-400 whitespace-nowrap">
                {new Date(order.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td className="py-3">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${PILL[order.status]}`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                  {order.status}
                </span>
              </td>
              {activeTab !== "DELIVERED" && (
                <td className="py-3">
                  {activeTab === "PLACED" && (
                    <button onClick={() => updateStatus(order.orderId)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#CF2101] text-white hover:opacity-85 transition-opacity">
                      Accept
                    </button>
                  )}
                  {activeTab === "PREPARING" && (
                    <button onClick={() => updateStatus(order.orderId)}
                      className="text-xs font-medium px-3 py-1.5 rounded-lg border border-green-300 text-green-800 hover:bg-green-50 transition-colors">
                      Mark READY
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}