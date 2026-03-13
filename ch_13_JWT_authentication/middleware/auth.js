
import HttpError from "../middleware/HttpError.js";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const auth = async function (req,res,next){
    try {
        const authHeader = req.header("Authorization");
        console.log("header",authHeader);

        if(!authHeader){
            return next(new HttpError("auth header is required",401));
        }

        const token = authHeader.replace("Bearer ","") //token extract

        console.log("token",token);
        //for token verify
        const decoded = jwt.verify(token,process.env.JWT_SECRET); //decoded id define kre

        console.log("decoded data",decoded);

        const user = await User.findOne({
            _id:decoded._id,
            "tokens.token":token // we create tokens in schema this tokens.token is equal to token 
        });
        if(!user){
            return next(new HttpError("authentication failed",401))
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        next(new HttpError("please authenticate",401))
    }
    
}
export default auth;