import Booking from "../model/Booking.js";
import HttpError from "../middleware/HttpError.js";
import Service from "../model/Services.js";

const create = async (req, res, next) => {
    try {
        const { serviceId, bookingDate, timeSlot, notes } = req.body;

        const userId = req.user._id;

        const service = await Service.findById(serviceId);

        if (!service) {
            return next(new HttpError("service not exist", 404));
        }
        if (!service.isActive) {
            return next(new HttpError("not active this service. try after few minutes", 409));
        }

        const startOfDay = new Date(bookingDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(bookingDate);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBooking = await Booking.findOne({
            serviceId,
            bookingDate: { $gte: startOfDay, $lt: endOfDay },
            timeSlot,
            status: { $in: ["pending", "confirmed"] }
        });
        if (existingBooking) {
            return next(new HttpError("This time slot is already booked", 409));
        }

        const newBooking = new Booking({
            userId,
            serviceId,
            bookingDate: new Date(bookingDate),
            timeSlot,
            notes,
            totalPrice: service.price,
        });
        await newBooking.save();
        const savedBooking = await Booking
            .findById(newBooking._id)
            .populate({
                path: "serviceId",
                select: "name price duration -_id"
            });
        res.status(201).json({ success: true, message: "booking confirm successfully", savedBooking });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

export default { create }