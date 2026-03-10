
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"Name must be at least 3 characters"],
        maxlength:[30,"Name cannot exceed 30 characters"]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        validate:(value)=>{
            if(!value.endsWith("@gmail.com")){
                throw new Error("Email must end with @gmail.com");
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[6,"Password must be at least 6 characters"]
    }

},{timestamps:true});

const User = mongoose.model("User",userSchema);
export default User; 