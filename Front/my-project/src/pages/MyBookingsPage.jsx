import React, { useEffect } from "react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const MyBookingsPage = () => {
  const { myBookings, loading, fetchMyBookings } = useBooking();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchMyBookings();
  }, [isLoggedIn, navigate, fetchMyBookings]);

  if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#AD343E]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['DM_Sans',_sans-serif]">
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h1
          className="font-['Oswald',_sans-serif] text-4xl font-bold text-gray-900 mb-8"
          data-aos="fade-down"
        >
          My Bookings
        </h1>

        {myBookings.length === 0 ? (
          <div
            className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100"
            data-aos="fade-up"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-['Oswald',_sans-serif]">
              No bookings yet
            </h2>
            <p className="text-gray-500 mb-8">
              You haven't made any table reservations yet.
            </p>
            <button
              onClick={() => navigate("/book-table")}
              className="px-8 py-3 bg-[#AD343E] text-white rounded-full font-bold hover:bg-[#8f2a32] transition-all"
            >
              Book A Table
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myBookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all hover:shadow-md"
                data-aos="fade-up"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {booking.status === "confirmed" && (
                        <CheckCircle size={12} />
                      )}
                      {booking.status === "cancelled" && <XCircle size={12} />}
                      {booking.status === "pending" && (
                        <AlertCircle size={12} />
                      )}
                      {booking.status}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ID: #{booking._id.slice(-6)}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fcece9] flex items-center justify-center text-[#AD343E]">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Date
                      </p>
                      <p className="font-bold text-gray-800">
                        <p className="font-bold text-gray-800">
                          {new Date(booking.bookingDateTime).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#edf6f9] flex items-center justify-center text-[#2C2F24]">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Time
                      </p>
                      <p className="font-bold text-gray-800">
                        {new Date(booking.bookingDateTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          },
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f3f4f6] flex items-center justify-center text-gray-600">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Guests
                      </p>
                      <p className="font-bold text-gray-800">
                        {booking.capacity} People
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-xs text-center text-gray-400">
                    Booked on {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyBookingsPage;
