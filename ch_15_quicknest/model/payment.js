
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    bookingId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    razorPayOrderId:{
        type:String,
        required:true
    },
    razorPayPaymentId:{
        type:String,
        default:null
    },
    razorPaySignature:{
        type:String,
        default:null
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{
        type:String,
        required:true,
        default:"INR"
    },
    status:{
        type:String,
        required:true,
        enum:["created","pending","captured","failed","refunded"],
        default:"created"
    },
    paidAt:{
        type:Date,
        required:true,
        default:Date.now
    }
},{
    timestamps:true
});

const payment = mongoose.model("Payment",paymentSchema);

export default payment;