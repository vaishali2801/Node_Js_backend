import mongoose from "mongoose";
import HttpError from "../middleware/HttpError.js";
import User from "../model/userModel.js";
import Provider from "../model/Provider.js";
import Service from "../model/Services.js";
import sendEmail from "../utils/sendEmail.js";
import { getProviderRegistrationEmailTemplate } from "../services/emailTemplate.js";
import Booking from "../model/Booking.js";

const registerAsProvider = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return next(new HttpError("user not found", 404));
        }

        const existingProvider = await Provider.findOne({ userId });
        if (existingProvider) {
            user.role = "provider";
            await user.save();
            await sendEmail({
                to: user.email,
                subject: "Already Registered as Provider",
                html: getProviderRegistrationEmailTemplate({
                    userName: user.name,
                    subject: "Provider Already Exists"
                })
            });
            return res.status(200).json({
                message: "Provider already exists, role updated",
            });
        }

        const { services, documents, experience } = req.body;

        if (!services || !Array.isArray(services) || services.length === 0) {
            return next(new HttpError("service required!!", 400));
        }

        const validService = await Service.find({
            _id: { $in: services }
        }).select("_id");

        if (validService.length !== services.length) {
            return next(new HttpError("service are missing", 400));
        }

        const newProvider = new Provider({
            userId,
            service: validService,
            experience,
            documents
        });
        user.role = "provider";
        await newProvider.save();

        await user.save();
        await sendEmail({
            to: user.email,
            subject: "Welcome Provider 🎉",
            html: getProviderRegistrationEmailTemplate({
                userName: user.name,
                subject: "You are now a Provider 🚀"
            })
        });

        res.status(201).json({
            success: true,
            message: "provider created successfully!!",
            newProvider
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};
const getProvider = async (req, res, next) => {
    try {
        const { isVerified } = req.query;
        let query = {};

        if (isVerified != undefined) {
            query.isVerified = isVerified === "true";
        }
        const provider = await Provider.find(query).populate([
            { path: "userId", select: "name email phone" },
            { path: "services", select: "name" }
        ]);
        if (!provider.length) {
            return next(new HttpError("no provider data found", 404));
        }
        res.status(200).json({
            success: true,
            message: "providers fetched successfully",
            provider
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const getProviderById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const provider = await Provider.findById(id);
        if (!provider) {
            return next(new HttpError("provider not found", 404))
        }
        res.status(200).json({ success: true, message: "provider fetched successfully!", provider })
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const getProviderBooking = async(req,res,next)=>{
    try {
        const userId = req.params.id || req.user._id;

        const user = await Provider.findById(userId);

        const role = req.user.role

        if(!user){
            return next(new HttpError("user not found",404));
        }

        const bookings = await Booking.find({providerId:user._id});

        if(!bookings || bookings.length === 0){
            return next(new HttpError("booking not found",404));
        }
        
        if(role === "provider"){
            if(bookings[0].providerId.toString() !== req.user._id){
            return next(new HttpError("with this provider not access",400));
            }
        }

        res.status(200).json({success:true,message:"booking fetched successfully!!",bookings});
    
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

export default { registerAsProvider, getProvider,getProviderById, updateProvider, deleteProvider,getProviderBooking }    