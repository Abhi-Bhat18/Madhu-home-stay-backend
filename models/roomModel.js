const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomType: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    totalRooms: {
      type: Number,
      required: true,
    },
    roomDescription: {
      type: String,
    },
    roomImage: {
      type: String,
    },
    roomBookings: [
      {
        bookedDates: {
          checkIn: { type: Date },
          checkOut: { type: Date },
          bookedRooms: {  type: Number}
        },
      },
    ],
  },
  {
    timestamps: true,
  },
  { collection: "room" }
);

module.exports = mongoose.model("Room", roomSchema);


