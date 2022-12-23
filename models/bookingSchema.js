const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    roomDetails: [{ roomType: String, roomsBooked: Number, roomCost:Number }],
    paymentDetails: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  { collection: "booking" }
);

module.exports = mongoose.model("Booking", bookingSchema);
