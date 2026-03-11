
import HttpError from "../middleware/HttpError.js";
import User from "../model/userModel.js";

const addUser = async(req,res,next)=>{
    try {
    const {name,email,password} = req.body;
    const newUser =new User({
        name,
        email,
        password
    });
    await newUser.save();
    res.status(201).json({message:"user added successfully",newUser});
    } catch (error) {
        next(new HttpError(error.message, 500));
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
const getAllUser = async(req,res,next)=>{
    try {
        const user = await User.find({});
    if (user.length === 0) {
        res.status(200).json({ message: "no product data found" });
    }
    res.status(200).json({message:"user data fetched successfully",user});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const getUserById = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new HttpError("user not found with this id", 404));
        }
        res.status(200).json({message:"user found successfully with this id",user});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const deleteUser = async(req,res,next)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user){
            return next(new HttpError("user not found ", 404));
        }
        res.status(200).json({message:"user deleted successfully",user});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
const updateUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return next(new HttpError("user not found",404));
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name","email","password"];
        const isValid = updates.every((f)=>{
            return allowedUpdates.includes(f);
        });
        if(!isValid){
            return next(new HttpError("only allowed field can be updated",400));
        }
        updates.forEach((u)=>{
            user[u] = req.body[u];
        });
        await user.save();
        res.status(200).json({message:"user updated successfully",user});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
export default {addUser,login,getAllUser,getUserById,deleteUser,updateUser};