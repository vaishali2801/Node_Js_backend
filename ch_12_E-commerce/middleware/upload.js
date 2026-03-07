import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        //params defines how files should be uploaded to Cloudinary.
        folder:"e-commerce-product",
        allowedFormats:["pdf","jpg","jpeg","webp","png"],
        transformation:[{width:550,height:550,crop:"limit"}]
    }
})
const uploads = multer({storage});
export default uploads;