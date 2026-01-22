import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Check,
  X,
  Loader2,
  Trash2,
  Calendar,
  Clock,
  User,
  Mail,
} from "lucide-react";
import ConfirmModal from "../components/ConfirmModal";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionData, setActionData] = useState(null); // { type: 'delete'|'update', id: string, status?: string }

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    return { Authorization: `Bearer ${token}` };
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/admin/bookings",
        { headers: getAuthHeaders() },
      );
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load bookings", { duration: 1000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async () => {
    if (!actionData) return;

    try {
      if (actionData.type === "delete") {
        await axios.delete(
          `http://localhost:3000/api/admin/bookings/${actionData.id}`,
          { headers: getAuthHeaders() },
        );
        setBookings((prev) => prev.filter((b) => b._id !== actionData.id));
        toast.success("Booking deleted", { duration: 1000 });
      } else if (actionData.type === "update") {
        await axios.put(
          `http://localhost:3000/api/admin/bookings/${actionData.id}`,
          { status: actionData.status },
          { headers: getAuthHeaders() },
        );
        setBookings((prev) =>
          prev.map((b) =>
            b._id === actionData.id ? { ...b, status: actionData.status } : b,
          ),
        );
        toast.success(`Booking ${actionData.status}`, { duration: 1000 });
      }
    } catch (error) {
      toast.error("Action failed", { duration: 1000 });
    } finally {
      setActionData(null);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      Confirmed: "bg-green-50 text-green-700 border-green-200",
      Cancelled: "bg-red-50 text-red-700 border-red-200",
      Pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };
    return `px-3 py-1 rounded-full text-xs font-semibold border tracking-wide uppercase ${styles[status] || styles.Pending}`;
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
        isOpen={!!actionData}
        onClose={() => setActionData(null)}
        onConfirm={handleAction}
        title={
          actionData?.type === "delete"
            ? "Delete Booking"
            : `Mark as ${actionData?.status}`
        }
        description={
          actionData?.type === "delete"
            ? "Permanently remove this booking?"
            : `Are you sure you want to update this booking status to ${actionData?.status}?`
        }
        confirmText={actionData?.type === "delete" ? "Delete" : "Confirm"}
        isDestructive={
          actionData?.type === "delete" || actionData?.status === "Cancelled"
        }
      />

      <div className="mb-8">
        <h1 className="text-3xl font-medium text-gray-900 tracking-wide uppercase">
          Bookings
        </h1>
        <p className="text-gray-500 mt-1 tracking-wide">
          Manage table reservations
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 text-gray-500 uppercase text-sm tracking-widest border-b border-gray-100">
            <tr>
              <th className="p-5 font-normal">Guest Details</th>
              <th className="p-5 font-normal">Date & Time</th>
              <th className="p-5 font-normal">Pax</th>
              <th className="p-5 font-normal">Status</th>
              <th className="p-5 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-12 text-center text-gray-400 tracking-wide"
                >
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="p-4 pl-5">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 flex items-center gap-2 text-lg tracking-wide">
                        <User className="w-4 h-4 text-gray-400" />{" "}
                        {booking.user?.name || booking.name || "Guest"}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-2 mt-1 tracking-wide">
                        <Mail className="w-3 h-3 text-gray-400" />{" "}
                        {booking.user?.email || booking.email || "No email"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col text-sm text-gray-600 tracking-wide">
                      <span className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-400" />{" "}
                        {new Date(
                          booking.bookingDateTime || booking.date,
                        ).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />{" "}
                        {new Date(
                          booking.bookingDateTime || booking.date,
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600 font-medium text-lg text-center w-20">
                    {booking.capacity || booking.guests}
                  </td>
                  <td className="p-4">
                    <span className={getStatusBadge(booking.status)}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 pr-5 text-right space-x-1">
                    {booking.status === "Pending" && (
                      <>
                        <button
                          onClick={() =>
                            setActionData({
                              type: "update",
                              id: booking._id,
                              status: "Confirmed",
                            })
                          }
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition"
                          title="Confirm"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            setActionData({
                              type: "update",
                              id: booking._id,
                              status: "Cancelled",
                            })
                          }
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                          title="Cancel"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() =>
                        setActionData({ type: "delete", id: booking._id })
                      }
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition ml-1"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
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
