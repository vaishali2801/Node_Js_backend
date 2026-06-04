
import express from "express";
import { razorpayWebhook } from "../controller/webHookController.js";
const app = express.Router();

app.use(
    "/payment/webhook",
    express.raw({ type: "application/json" })
);

app.post(
    "/payment/webhook",
    express.raw({ type: "application/json" }),
    razorpayWebhook
);

export default router;