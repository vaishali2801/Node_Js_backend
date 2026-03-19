
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:(value)=>{
            if(!value.endsWith("@gmail.com")){
                throw new Error("invalid email");
            }
        }
    },
    googleID:{
        type:String,
        unique:true
    },
});
const User = mongoose.model("userModel",userSchema);
export default User;