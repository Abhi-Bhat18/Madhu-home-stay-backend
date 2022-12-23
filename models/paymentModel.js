const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
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
        type:mongoose.Schema.Types.ObjectId,ref:'User'
    }
},{
    timestamps:true
},{'collection':'payment'})

const PaymentModel = mongoose.model('Payment',PaymentSchema);
module.exports = PaymentModel;