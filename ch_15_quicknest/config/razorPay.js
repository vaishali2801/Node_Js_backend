
import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config({path:"./.env"});

const razorPay = new Razorpay({
    key_id:process.env.RAZORPAY_TEST_API_KEY,
    key_secret:process.env.RAZORPAY_TEST_API_SECRET
});

export default razorPay;