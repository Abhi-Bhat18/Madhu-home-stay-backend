const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/Madhu_Home_Stay",(err,db)=> {if(err) throw err;})
	  console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB 
