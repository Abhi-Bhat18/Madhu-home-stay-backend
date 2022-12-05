const mongoose = require('mongoose')

const paymentSchem = new mongoose.Schema({
    orderId:{
        type:String
    },
    paymentId:{
        type:String
    },
    signature:{
        type:String
    },
    bookedDate:{
        type:Date
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    }
},{
    timestamps:true
},{'collection':'payment'})

module.exports = mongoose.model('Payment',paymentSchem);