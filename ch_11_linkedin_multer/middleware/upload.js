
import multer from "multer";
import path from "path";
import HttpError from "./HttpError.js";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/");
    },
    filename:(req,file,cb)=>{
        const uniqueName = file.fieldname + "-" + Date.now() + path.extname(file.originalname);
        cb(null,uniqueName);
    }
});

const fileFilter = (req,file,cb)=>{
    const allowed = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "video/mp4"
    ]
    if(!allowed.includes(file.mimetype)){
        return cb(new HttpError("Invalid file type",404),false);
    }
    cb(null,true);
}

const uploads = multer({
    storage,
    fileFilter,
    limits:{fileSize: 20 * 1024 * 1024}
})

export default uploads;