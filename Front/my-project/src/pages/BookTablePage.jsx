import React, { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const BookTablePage = () => {
  const { createBooking, loading } = useBooking();
  const { isLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    capacity: "1 Person",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please login to book a table");
      return;
    }

    if (!formData.date || !formData.time || !formData.name || !formData.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Parse capacity to number
    const capacityNum = parseInt(formData.capacity.split(" ")[0]);

    await createBooking({
      ...formData,
      capacity: capacityNum,
    });
  };

  return (
    <div className="min-h-screen relative font-[oswald]">
      {/* Background Map Image Placeholder - In production use actual map or image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://maps.googleapis.com/maps/api/staticmap?center=40.7128,-74.0060&zoom=13&size=1920x1080&sensor=false&visual_refresh=true&style=feature:all|element:all|saturation:-100|lightness:10')",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 md:p-12 text-center"
          data-aos="zoom-in"
        >
          <h1 className="font-['Oswald',_sans-serif] text-5xl md:text-6xl text-[#2C2F24] mb-4">
            Book A Table
          </h1>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto">
            We consider all the drivers of change gives you the components you
            need to change to create a truly happens.
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl bg-opacity-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {/* Date */}
              <div className="space-y-2">
                <label className="font-bold text-[#2C2F24] text-sm">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-full border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all text-gray-700"
                />
              </div>

              {/* Time */}
              <div className="space-y-2">
                <label className="font-bold text-[#2C2F24] text-sm">Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-full border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all text-gray-700 appearance-none bg-white"
                >
                  <option value="">Select Time</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                  <option value="07:30 PM">07:30 PM</option>
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="08:30 PM">08:30 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                </select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="font-bold text-[#2C2F24] text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-full border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="font-bold text-[#2C2F24] text-sm">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="x-xxx-xxx-xxxx"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-full border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Total Person - Full Width */}
              <div className="space-y-2 md:col-span-2">
                <label className="font-bold text-[#2C2F24] text-sm">
                  Total Person
                </label>
                <select
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  className="w-full px-6 py-3 rounded-full border border-gray-200 focus:border-[#AD343E] focus:ring-1 focus:ring-[#AD343E] outline-none transition-all text-gray-700 appearance-none bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={`${num} Person`}>
                      {num} Person
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#AD343E] text-white font-['Oswald',_sans-serif] font-bold text-lg py-4 rounded-full hover:bg-[#962a33] transition-colors shadow-lg shadow-[#AD343E]/20 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Booking..." : "Book A Table"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookTablePage;
