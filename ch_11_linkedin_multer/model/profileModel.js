
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    fullName:{
        type:String,
        trim:true,
        required:true
    },
    bio: String,
    Headline: String,
    ProfileImage: String,
    Resume:String,
    ProjectImages: [String],
    introVideo: String,

});
const Profile = mongoose.model("Profile", profileSchema);

export default Profile;