const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://abhishek1234:root@cluster0.7hooq3f.mongodb.net/Madhu_Home_Stay?retryWrites=true&w=majority")
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB 
