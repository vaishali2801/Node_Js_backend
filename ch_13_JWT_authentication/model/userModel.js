
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    },
    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]

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

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    if(!user){
        return new Error("failed to generate token")
    }
    user.tokens = user.tokens.concat({token})
    await user.save();
}
userSchema.methods.toJSON = function(){
    try {
        const user = this;
        const userObject = user.toObject();
        delete userObject.password;
        delete userObject.__v;
        // delete userObject.tokens;
        return userObject;
    } catch (error) {
        throw new Error(error.message);
    }
}
const User = mongoose.model("User",userSchema);
export default User; 