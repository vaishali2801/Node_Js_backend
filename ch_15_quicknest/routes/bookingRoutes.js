
import express from "express";
import auth from "../middleware/auth.js";
import bookingController from "../controller/bookingController.js";

const router = express.Router();

router.post("/create",auth,bookingController.create);

//booking
router.get("/getAllBooking",auth,bookingController.getAllBooking);
router.get("/getAllService/:id",auth,bookingController.getAllService);
router.get("/getAllCategory/:id",auth,bookingController.getAllCategory);

export default router;