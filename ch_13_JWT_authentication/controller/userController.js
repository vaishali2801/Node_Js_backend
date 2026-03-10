
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
export default {addUser};