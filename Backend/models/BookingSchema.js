const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookingDateTime: {
      type: Date,
      required: true,
      unique: true, 
    },
    capacity: Number,
    name: String,
    phone: String,
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("Booking", BookingSchema);