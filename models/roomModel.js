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
    bookedRooms: [
      {
        bookedDates: {
          type: Date,
        },
        availableRooms: {
          type: Number,
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
