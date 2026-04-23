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
        user.role = "provider";
        await newProvider.save();
        
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
const getProvider = async(req,res,next)=>{
    try {
        const {isVerified} = req.query;
        let query = {};

        if(isVerified != undefined){
            query.isVerified = isVerified === "true";
        }
        const provider = await Provider.find(query).populate([
            {path:"userId",select:"name email phone"},
            {path:"services",select:"name"}
        ]);
        if(!provider.length){
            return next(new HttpError("no provider data found",404));
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
const getProviderById = async(req,res,next)=>{
    try {
        const id = req.params.id;

        const provider = await Provider.findById(id);
        if(!provider){
            return next(new HttpError("provider not found",404))
        }
        res.status(200).json({success:true,message:"provider fetched successfully!",provider})
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
// const updateProvider = async(req,res,next)=>{
//     try {
//         const provider = await Provider.findById(req.params.id);
//         if(!provider){
//             return 
//         }
//     } catch (error) {
//         next(new HttpError(error.message, 500));
//     }
// }
export default { registerAsProvider,getProvider}    