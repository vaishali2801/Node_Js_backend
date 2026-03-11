
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

userSchema.pre("save",async function(){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
});

userSchema.statics.findByCredentials = async function(email,password){
    const user = await User.findOne({email});
    if(!user){
        throw new Error("unable to login");
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
        throw new Error("unable to login");
    }
    return user;
}

const User = mongoose.model("User",userSchema);
export default User; 