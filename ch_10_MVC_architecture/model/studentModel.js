
import mongoose from "mongoose";

// const studentModel = mongoose.model("Students",{
//     firstName:{
//         type:String,
//         trim : true,
//         require :true
//     },
//     lastName:{
//         type:String,
//         trim : true,
//         require :true
//     },
//     email:{
//         type:String,
//         trim : true,
//         require :true,
//         unique: true,
//     },
//     phoneNumber:{
//         type: Number,
//         trim : true,
//         require :true,
//         min :10,
//     },
//     course:{
//         enum:["Full stack,UI/UX,video editing,Graphics designing"],
//         type: String,
//         trim : true,
//         require :true,
//         min :10,
//     },
//     isActive:{
//         enum:["active,pending,closed"]
//     }
// });

//using another method with explicit schema
const studentSchema = mongoose.Schema({
    firstName:{
        type:String,
        trim : true,
        required :true
    },
    lastName:{
        type:String,
        trim : true,
        required :true
    },
    email:{
        type:String,
        trim : true,
        required :true,
        unique: true,
    },
    phoneNumber:{
        type: Number,
        trim : true,
        required :true,
        min :10,
    },
    course:{
        enum: ["Full stack", "UI/UX", "Video Editing", "Graphics Designing"],
        type: String,
        trim : true,
        required :true,
    },
    isActive:{
        enum: ["active", "pending", "closed"]
    }
});
const studentModel = mongoose.model("Student", studentSchema);


export default studentModel;