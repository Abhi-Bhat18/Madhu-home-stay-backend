const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Importing the database models
const User = require("../models/userModel");
const Payment = require("../models/paymentModel");
const Booking = require("../models/bookingSchema");
const Room = require("../models/roomModel");

dotenv.config(); //Configuring the env

//Importing the Razorpay key and secret
const keyId ="rzp_test_awwz7uQCXxYih" ;
const keySecret ="OO5WA5Hf49oRYzxqrcv1q9Ki";

//Creatinag a razorpay instance
const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,  
});

//@route /payment
const payment = async (req, res) => {
  const user = await User.findById(req.userId).lean();

  //Setting the parameters for RazorPay
  const payment_capture = 1;
  const amount = req.body.amount;
  const currency = "INR";

  //Options for Razorpay
  const options = {
    amount: parseInt(amount) * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    console.log(response);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

//@route /verification
const paymentVerification = async (req, res) => {
  try {
    console.log(req.userId)
    const razorpay_order_id = req.body.razropayOrderId;
    const razorpay_payment_id = req.body.razorpayPaymentId;
    const razorpay_signature = req.body.razorpaySignature;
    const roomDetails = req.body.roomDetails;

    //Razorpay verification process
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      const payment = await Payment.create({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        userId: req.userId,
      });

      if (payment) {
        const booking = await Booking.create({
          checkIn: req.body.checkIn,
          checkOut: req.body.checkOut,
          roomDetails: req.body.roomDetails,
          userId: req.userId,
          paymentDetails: payment._id,
        });
        if (booking) {
          await User.findByIdAndUpdate(
            { _id: req.userId },
            { $addToSet: { bookingDetails: booking._id } }
          );
          roomDetails.map(async (ele) => {
            const roomBookings = {
              bookedDates: {
                checkIn: req.body.checkIn.substring(0, 10),
                checkOut: req.body.checkOut.substring(0, 10),
                bookedRooms: ele["roomsBooked"],
              },
            };

            const room =
              (await Room.findOneAndUpdate(
                {
                  roomType: ele["roomType"],
                  "roomBookings.bookedDates.checkIn":
                    req.body.checkIn.substring(0, 10),
                  "roomBookings.bookedDates.checkOut":
                    req.body.checkOut.substring(0, 10),
                },
                {
                  $inc: {
                    "roomBookings.$.bookedDates.bookedRooms":
                      ele["roomsBooked"],
                  },
                }
              )) ||
              (await Room.findOneAndUpdate(
                { roomType: ele["roomType"] },
                { $push: { roomBookings: roomBookings } }
              ));
            
          });

          res.status(200).json({
            message: "Payment Successful",
            status: "ok",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  payment,
  paymentVerification,
};
