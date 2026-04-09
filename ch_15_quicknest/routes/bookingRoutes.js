
import express from "express";
import auth from "../middleware/auth.js";
import bookingController from "../controller/bookingController.js";

const router = express.Router();

router.post("/create",auth,bookingController.create);

export default router;