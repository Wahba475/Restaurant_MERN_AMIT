const Booking = require("../models/BookingSchema");

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const { capacity, date, time, name, phone } = req.body;

    const bookingDateTime = new Date(`${date} ${time}`);

    // 1️⃣ Check if already booked
    const existingBooking = await Booking.findOne({
      bookingDateTime,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "This time slot is already reserved",
      });
    }

    // 2️⃣ Create booking
    const booking = await Booking.create({
      user: req.user._id,
      capacity,
      bookingDateTime,
      name,
      phone,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET MY BOOKINGS (USER)
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,

};
