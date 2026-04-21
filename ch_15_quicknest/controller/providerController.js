import HttpError from "../middleware/HttpError.js";
import User from "../model/userModel.js";
import Provider from "../model/Provider.js";
import Service from "../model/Services.js";
import sendEmail from "../utils/sendEmail.js";
import generateEmailTemplate from "../services/emailTemplate.js";

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
                html: generateEmailTemplate({
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
        await newProvider.save();
        user.role = "provider";
        await user.save();
        await sendEmail({
            to: user.email,
            subject: "Welcome Provider 🎉",
            html: generateEmailTemplate({
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
export default { registerAsProvider }    