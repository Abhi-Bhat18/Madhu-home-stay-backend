const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();
const User = require("../models/userModel");

// @desc    Register new user
// @route   POST /api/users/register
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
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@route : POST /api/users/login
//@access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });
       
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
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

//@route: get /api/user
const userDetails = async(req,res)=>{
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate('bookingDetails','checkIn checkOut roomDetails').lean();
    console.log(user['bookingDetails'][0]['roomDetails'])
    // const data = {
    //   fullName:user.fullName,
    //   email:user.email,
    //   contact:user.contact,
    //   bookingDetails:[
    //     user.bookingDetails
    //   ]
    // }
    // console.log(data);
    res.send('user details');

  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }

}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginUser,
  registerUser,
  userDetails
};
