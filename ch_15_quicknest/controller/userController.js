
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
        const token = await user.generateAuthToken();
        await user.save();
        res.status(201).json({success:true,message:"added successfully!",user,token});
    } catch (error) {
        next(new HttpError(error.message,500));
    }
}
const login = async(req,res,next)=>{
    try {
        const {email,password}= req.body;
        const user = await User.findByCredentials(email,password);
        const token = await user.generateAuthToken();
        if(!user){
            throw new Error("unable to login");
        }
        res.status(200).json({success:true,message:"successfully login!!",user,token});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const authLogin = async(req,res,next)=>{
    try {
        const user = req.user;
        if(!user){
            return next(new HttpError("user not found",404));
        }
        res.status(200).json({success:true,user});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const logOut =async(req,res,next)=>{
    try {
        const user = req.user;

        user.tokens = user.tokens.filter((t)=>{
            return t.token != req.token;
        });
        await user.save();
        res.status(200).json({success:true,message:"user logout successfully!!"});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const logOutAll = async(req,res,next)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).json({success:true,message:"user logout all device successfully!"});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}

const allUser = async(req,res,next)=>{
    try {
        const users = await User.find({});
        if(users.length===0){
            res.status(200).json({ message: "no product data found" });
        }
        res.status(200).json({success:true,message:"user data fetched successfully!!",users});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
export default {addUser,login,authLogin,logOut,logOutAll,allUser};