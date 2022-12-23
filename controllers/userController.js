const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const User = require("../models/userModel");
const Booking = require("../models/bookingSchema");
// @desc    Register new user
// @route   POST /api/user/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, contact } = req.body;
    if (!fullName || !email || !password || !contact) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      contact,
    });

    if (user) {
      res.status(201).send({
        message: "user registered",
        status: "ok",
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@route : POST /api/user/login
//@access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id,user.isAdmin);
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token,
        status: "ok",
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(400).json({ status: "error" });
  }
};

//@route: get /api/user/:id
const userDetails = async (req, res) => {
  try {

    const userId = req.params.id;

    const user = await User.findById(userId).select("fullName email contact") 
    console.log(user)
    const booking = await Booking.find({userId:userId}).populate('roomDetails','roomType roomsBooked')

    if (user) {
      res.status(200).json({user,booking}); //send the user details to the client side
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


//Token generation
const generateToken = (id,isAdmin) => {
  return jwt.sign({ userId:id,'isAdmin':isAdmin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = {
  loginUser,
  registerUser,
  userDetails,
};
