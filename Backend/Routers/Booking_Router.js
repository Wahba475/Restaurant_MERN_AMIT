const express = require("express");
const router = express.Router();
const { createBooking, getMyBookings,
} = require("../controller/Booking");
const { protect } = require("../middleware/UserToken");

router.post("/create", protect, createBooking);
router.get("/my-bookings", protect, getMyBookings);

module.exports = router;