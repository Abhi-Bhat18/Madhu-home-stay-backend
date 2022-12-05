const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    checkIn:{
        type:Date,
        required:true
    },
    checkOut:{
        type:Date,
        required:true
    },
    paymentDetails:[{
        type:mongoose.Schema.Types.ObjectId,ref:'payment'
    }]
})