import { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const BookingContext = createContext();

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export const BookingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [myBookings, setMyBookings] = useState([]);

  // ✅ Memoized: does NOT change every render
  const createBooking = useCallback(async (bookingData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to book a table");
      return { success: false, error: "Not logged in" };
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/booking/create`,
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      toast.success("Table booked successfully!");
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Failed to book table";
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Memoized: safe to use in useEffect
  const fetchMyBookings = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/booking/my-bookings`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setMyBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    createBooking,
    fetchMyBookings,
    myBookings,
    loading,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
