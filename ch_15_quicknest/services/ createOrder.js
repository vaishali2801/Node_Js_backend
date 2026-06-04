import razorpay from "../config/razorPay.js";

export const createOrder = async ({ amount,receipt,bookingId}) => {

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt,
        notes: {
            bookingId: bookingId.toString()
        }
    };

    return await razorpay.orders.create(options);
};