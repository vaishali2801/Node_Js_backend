import HttpError from "../middleware/HttpError.js";
import User from "../model/userModel.js";
import Provider from "../model/Provider.js";
import Service from "../model/Services.js";

const addProvider = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return next(new HttpError("user not found", 404));
        }

        const existingProvider = await Provider.findOne({ userId });
        if (existingProvider) {
            return next(new HttpError("already provider register", 208));
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

        await newProvider.save();

        res.status(201).json({
            success: true,
            message: "provider created successfully!!",
            newProvider
        });

    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};
export default {addProvider}    