
import Booking from "../model/Booking.js";
import Payment from "../model/payment.js";
import { createOrder } from "../services/createOrder.js";

import crypto from "crypto";

const createPaymentOrder = async (req, res, next) => {
    try {
        const { bookingId } = req.body;

        const booking = await Booking.findById(bookingId).populate("userId serviceId providerId");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const order = await createOrder({
            amount: booking.totalPrice,
            receipt: `receipt_${booking._id}`,
            bookingId: booking._id
        });

        const payment = await Payment.create({
            bookingId: booking._id,
            userId: booking.userId._id,
            razorPayOrderId: order.id,
            amount: booking.totalPrice,
            currency: "INR",
        });

        booking.paymentId = payment._id;
        await booking.save();

        res.status(201).json({ success: true, order, payment });

    } catch (error) {
        return res.status(500).json({ message: "error creating in payment order" });
    }
}

const verifyPayment = async (req, res, next) => {
    try {
        const { razorPay_order_id, razorPay_payment_id, razorpay_signature, bookingId } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_TEST_API_SECRET)
            .update(razorPay_order_id + "|" + razorPay_payment_id)
            .digest("hex");

        const isAuthentic = generated_signature === razorpay_signature;

        if (!isAuthentic) {
            return res.status(400).json({ message: "payment verification failed" });
        }
        await Payment.findOneAndUpdate(
            { razorPayOrderId: razorPay_order_id },
            {
                razorPayPaymentId: razorPay_payment_id,
                razorPaySignature: razorpay_signature,
                status: "captured"
            }
        );

        await Booking.findByIdAndUpdate(
            bookingId,
            {
                paymentStatus: "paid",
                status: "confirmed"
            }
        );

        return res.status(200).json({
            message: "Payment verified successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: error.message, });
    }
}
export default { createPaymentOrder, verifyPayment };