const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//Importing the database models
const User = require("../models/userModel");
const Payment = require("../models/paymentModel");
const Booking = require('../models/bookingSchema');

dotenv.config(); //Configuring the env 

//Importing the Razorpay key and secret
const keyId = process.env.RAZOR_PAY_ID;
const keySecret = process.env.RAZOR_PAY_SECRET;

//Creatinag a razorpay instance
const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});


//@route /payment
const payment = async (req, res) => {
  //Getting the token and verifying 
  const token = req.headers["x-access-token"];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  //Setting the parameters for RazorPay
  const payment_capture = 1;
  const amount = 400;
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
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};


//@route /verification
const paymentVerification = async (req, res) => { 
  //Getting the token and verifying 
  const decoded = jwt.verify(req.headers["x-access-token"],process.env.JWT_SECRET)
  const user = User.findById(decoded.id); //Fetching the user

  //Getting the Razorpay payment details
  const razorpay_order_id = req.body.razropayOrderId;
  const razorpay_payment_id = req.body.razorpayPaymentId;
  const razorpay_signature = req.body.razorpaySignature;

  //Razorpay verification process
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_PAY_SECRET)
    .update(body.toString())
    .digest("hex");

  //Checking the signature
  if(expectedSignature === razorpay_signature){
    //Creating payment in Database
    const payment = Payment.create({
      orderId:razorpay_order_id,
      paymentId:razorpay_payment_id,
      signature:razorpay_signature,
      userId:decoded.id
    })  
    
    res.json({
      status: "ok",
    });
  }
  else{
    res.status(400).json({
      status:'ok',
      message:'error'
    })
  }
 
  
};
module.exports = {
  payment,
  paymentVerification,
};
