// const mongoose = require("mongoose");
const { model } = require("mongoose");
const Booking = require("../models/bookingSchema");
const Room = require('../models/roomModel');
// const paymet = require('../models/paymentModel')

// {
//     "checkIn":"2022-09-21T13:28:06.419Z",
//     "checkOut":"2022-11-21T13:28:06.419Z",
//     "roomDetails":{
//       "roomType":"1",
//       "roomsBooked":2
//     },
//     "paymentDetails":"638779a5c71a3f02858bc622"
// }
const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    console.log(bookingData);
    const booking = await Booking.create(bookingData);
    console.log(booking);
    if (booking) {
      res.send("rooms booked");
      return;
    }
    throw new Error('Data is not valid');
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const getBooking = async (req,res)=>{
    try {
        // const bookings = await Booking.find().populate({path:'paymentDetails',model:"Payment"})
        const bookings = await Booking.find().populate('userId','fullName _id')
        console.log(bookings);
        // console.log(bookings[1]['paymentDetails'])
        // console.log(bookings[0]['paymentDetails'])

        if(bookings){
            res.send('bookings found');
            return;
        }
       throw new Error('Some error occured')
    } catch (error) {
        console.log(error.message);
        res.send(error.messsage);
    }
}



// @desc create room details
// @route POST /api/admin/rooms
// @access admin
const createRoom = async (req, res) => {  
  try {
    const roomData = req.body;
    const room = await Room.create(roomData);
    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404);
      throw new Error("Room not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};


module.exports = {
    createBooking,
    getBooking
}
