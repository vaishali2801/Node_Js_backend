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

        await  newBooking.populate([{  path: "serviceId",
                select: "name price duration -_id"},{path:"userId",select:"name email"}]);
        res.status(201).json({ success: true, message: "booking confirm successfully", newBooking });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const getAllBooking = async(req,res,next)=>{
    try {
        let bookings;
        let Role = req.user.role;

        if(Role === "admin"|| Role === "super_admin"){
            bookings = await Booking.find({}).populate([
                {path:"serviceId",select:"name price duration description"},
                {path:"userId",select:"name email phone"},
            ])
        }else if(Role === "customer"){
            bookings = await Booking.find({userId:req.user._id})
            .populate("serviceId","name price duration");
        }else{
            return next(new HttpError("unAuthorization access",401));
        }
        if(bookings.length===0){
            return res.status(200)
            .json({success:true,message:"booking data not found"});
        }
        res.status(200).
        json({success:true,message:"all booking fetched successfully!!!!",bookings});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
const getAllService = async(req,res,next)=>{
    try {
        let bookings;
        let Role = req.user.role;
        const serviceId = req.params.id;

        if(Role === "admin" || Role === "super_admin"){
            bookings = await Booking.find({serviceId})
            .populate([
                {path:"serviceId",select:"name price duration description"},
                {path:"userId",select:"name email phone"}    
            ]);
        }else if(Role === "customer"){
            bookings = await Booking.find({userId:req.user._id,serviceId:serviceId})
            .populate("serviceId","name price duration description");
        }else{
            return next(new HttpError("unAuthorization access",401));
        }
        if(bookings.length===0){
            return res.status(200)
            .json({success:true,message:"booking data not found"});
        }
        res.status(200).
        json({success:true,message:"all booking service fetched successfully!!!!",bookings});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
const getAllCategory = async(req,res,next)=>{
    try {
        let bookings;
        let Role = req.user.role;
        const categoryId = req.params.id;

        if(Role === "admin" || Role === "super_admin"){
            bookings = await Booking.find({categoryId}).populate([
                {path:"categoryId",select:"name description"},
                {path:"userId",select:"name email phone"}
            ])
        }else if(Role === "customer"){
            bookings = await Booking.find({userId:req.user._id,categoryId:categoryId})
            .populate("categoryId","name description");
        }else{
            return next(new HttpError("unAuthorization access",401));
        }
        if(bookings.length===0){
            return res.status(200)
            .json({success:true,message:"booking data not found"});
        }
        res.status(200).
        json({success:true,message:"all booking category fetched successfully!!!!",bookings});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}

export default { create,getAllBooking ,getAllService,getAllCategory}