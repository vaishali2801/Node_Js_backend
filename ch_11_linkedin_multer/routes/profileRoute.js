import express from "express";
import profileController from "../controller/profileController.js";
import uploads from "../middleware/upload.js"

const router = express.Router();

router.post("/add",uploads.fields([
    {
        name:"ProfileImage",
        maxCount:1,
    },
    {
        name:"Resume",
        maxCount:1,
    },
    {
        name:"ProjectImages",
        maxCount:3,
    },
    {
        name:"introVideo",
        maxCount:1,
    }
]),profileController.CreateProfile);

router.get("/all",profileController.getAllProfile);
router.get("/:id",profileController.getSingleProfile);
router.delete("/:id",profileController.DeleteProfile);
export default router;