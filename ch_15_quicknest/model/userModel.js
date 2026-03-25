import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        enum:["customer","provider","admin","super_admin"],
        default:"customer"
    },
    isVerified:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps:true
    }
)

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