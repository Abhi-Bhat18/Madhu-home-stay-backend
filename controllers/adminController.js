const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const User = require("../models/userModel");
const Room = require("../models/roomModel");
const Booking = require("../models/bookingSchema");
const Payment = require("../models/paymentModel");

// @desc  get room details
//@route GET /api/rooms
//@access Public
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//@desc get all booking details
//@route GET /api/admin/bookings
//@access admin
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .select("checkIn checkOut roomDetails")
      .populate("userId", "fullName email")
      .sort({ checkIn: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//@desc get all payment details and populate the user
//@route GET /api/payments
//@access admin
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).populate(
      "userId",
      "fullName email"
    );
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//@desc get all the users
//@route GET /api/admin/users
//@access admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("fullName email").populate();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//function to update room details from Room model
// @desc update room details
//@route PUT /api/rooms/
//@access admin
const updateRoom = async (req, res) => {
  try {
    const { roomType, currentPrince, roomImage, roomDescription } = req.body;
    const room = await Room.find(roomType);
    if (room) {
      room.roomPrice = currentPrince;
      room.roomImage = roomImage;
      room.roomDescription = roomDescription;
      const updatedRoom = await room.save();
      res.status(200).json(updatedRoom);
    } else {
      res.status(404);
      throw new Error("Room not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomType, currentPrice, totalRooms } = req.body;
    const room = await Room.create({ roomType, currentPrice, totalRooms });
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404);
      throw new Error("Room not found");
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//export all the functions
module.exports = { getRooms, getBookings, getPayments, updateRoom, createRoom };
