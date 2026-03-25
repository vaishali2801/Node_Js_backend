
import HttpError from "../middleware/HttpError.js";
import User from "../model/userModel.js";

const addUser = async(req ,res ,next)=>{
    try {
        const {name,email,password,role,phone} = req.body;
        const newUser ={
            name,
            email,
            password,
            role,
            phone,
        };
        const user = new User(newUser);
        await user.save();
        res.status(201).json({success:true,message:"added successfully!",user});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
const login = async(req,res,next)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findByCredentials(email,password);
        if(!user){
            throw new Error("unable to login");
        }
        res.status(200).json({success:true,message:"successfully login!!",user});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

export default {addUser,login};