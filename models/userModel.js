const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    contact:{
        type:String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    token:{
        type:String
    },
    bookingDetails:[{
      type:mongoose.Schema.Types.ObjectId
    }],
    rooms:[{type:mongoose.Schema.Types.ObjectId,ref:'room'}]
  },
  {
    timestamps: true,
  },{'collection':'user'}
)

module.exports = mongoose.model('User', userSchema)