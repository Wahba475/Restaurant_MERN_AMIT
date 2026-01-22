import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader2, Trash2, Clock, ChevronDown } from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/admin/orders",
        { headers: getAuthHeaders() },
      );
      setOrders(data);
    } catch (error) {
      toast.error("Failed to load orders", { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Backend expects lowercase or specific casing?
      // The user says "here doesnt match the status in the orders page".
      // The backend returns "status": "delivered" (lowercase) or "Completed" (Capitalized).
      // We will send Capitalized to standardize, assuming backend accepts it or we force consistent view.
      // Let's force everything to Capitalized on UI, and send Capitalized to backend.

      const statusToSend = newStatus; // e.g. "Completed", "Delivered"

      await axios.put(
        `http://localhost:3000/api/admin/orders/${id}`,
        { status: statusToSend },
        { headers: getAuthHeaders() },
      );

      setOrders(
        orders.map((o) => (o._id === id ? { ...o, status: statusToSend } : o)),
      );
      toast.success(`Order ${statusToSend}`, { duration: 1000 });
    } catch (error) {
      toast.error("Update failed", { duration: 1000 });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await axios.delete(`http://localhost:3000/api/admin/orders/${deleteId}`, {
        headers: getAuthHeaders(),
      });
      setOrders(orders.filter((o) => o._id !== deleteId));
      toast.success("Order deleted", { duration: 1000 });
    } catch (error) {
      toast.error("Delete failed", { duration: 1000 });
    } finally {
      setDeleteId(null);
    }
  };

  const getStatusColor = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed" || s === "delivered")
      return "bg-green-100 text-green-700 border-green-200";
    if (s === "cancelled") return "bg-red-100 text-red-700 border-red-200";
    if (s === "processing") return "bg-blue-100 text-blue-700 border-blue-200";
    return "bg-yellow-100 text-yellow-700 border-yellow-200"; // Pending or others
  };

  // Helper to standardise display
  const normalizeStatus = (status) => {
    if (!status) return "Pending";
    // Capitalize first letter, lowercase rest? Or just Capitalize first.
    // Backend has "delivered" and "Completed". Let's format nicely.
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto font-['Oswald']">
      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Order"
        description="Permanently remove this order history? This info is useful for revenue tracking."
        confirmText="Delete"
        isDestructive={true}
      />

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-wide uppercase">
            Orders
          </h1>
          <p className="text-gray-500 mt-1 tracking-wide">
            Track and manage customer orders
          </p>
        </div>
        <Link
          to="/admin/menu/new"
          className="text-sm font-medium text-black hover:text-gray-700 underline underline-offset-4 tracking-wide"
        >
          Create New Menu Item
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
            <tr>
              <th className="p-5 font-normal tracking-wide">Order ID</th>
              <th className="p-5 font-normal tracking-wide">Items</th>
              <th className="p-5 font-normal tracking-wide">Total</th>
              <th className="p-5 font-normal tracking-wide">Status</th>
              <th className="p-5 font-normal tracking-wide text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-12 text-center text-gray-400">
                  No recent orders.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="p-4 pl-5">
                    <span className="font-mono text-sm text-gray-500">
                      #{order._id.slice(-6)}
                    </span>
                    <div className="text-sm text-gray-400 mt-1 flex items-center gap-1 tracking-wide">
                      <Clock className="w-3 h-3" />{" "}
                      {new Date(
                        order.createdAt || Date.now(),
                      ).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      {(order.items || []).map((item, idx) => (
                        <span
                          key={idx}
                          className="text-lg text-gray-700 flex items-center gap-2 tracking-wide"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                          {item.quantity}x {item.name || "Item"}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-900 text-lg tracking-wide">
                    {/* Backend returns totalPrice, need to use that. Fallback to totalAmount if exists */}
                    $
                    {Number(order.totalPrice || order.totalAmount || 0).toFixed(
                      2,
                    )}
                  </td>
                  <td className="p-4">
                    <div className="relative inline-block">
                      <select
                        value={normalizeStatus(order.status)}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm font-medium cursor-pointer outline-none focus:ring-2 focus:ring-black/5 transition tracking-wide ${getStatusColor(order.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <ChevronDown className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                    </div>
                  </td>
                  <td className="p-4 pr-5 text-right">
                    <button
                      onClick={() => setDeleteId(order._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
