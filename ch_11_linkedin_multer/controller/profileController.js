
import HttpError from "../middleware/HttpError.js";
import fs from "fs";
import Profile from "../model/profileModel.js";

const CreateProfile = async (req, res, next) => {
    try {
        const { fullName, bio, Headline } = req.body;
        if (!fullName) {
            return next(new HttpError("full name is required", 400));
        }
        //req.files contains files uploaded through Multer.
        const files = req.files || {};
        const ProfileImage = files.ProfileImage?.[0];
        const Resume = files.Resume?.[0];
        const introVideo = files.introVideo?.[0];
        const ProjectImages = files.ProjectImages || [];

        const newProfile = new Profile({
            fullName,
            bio,
            Headline,
            ProfileImage: ProfileImage.path || null,
            Resume: Resume.path || null,
            introVideo: introVideo.path || null,
            ProjectImages: ProjectImages.map(file => file.path)
        });
        await newProfile.save();
        res.status(200).json({ message: "profile created successfully!!", success: true, newProfile });

    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getAllProfile = async (req, res, next) => {
    try {
        const profiles = await Profile.find();
        res.status(200).json({ success: true, data: profiles });
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getSingleProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const profile = await Profile.findById(id);
        if (!profile) {
            return next(new HttpError("profile not found", 404));
        }
        res.status(200).json({success: true, profile} );
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const DeleteProfile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const profile = await Profile.findById(id);
        if (!profile) {
            return next(new HttpError("profile not found", 404));
        }
        if (profile.ProfileImage) {
            fs.unlinkSync(profile.ProfileImage)
        }
        if (profile.Resume) {
            fs.unlinkSync(profile.Resume)
        }
        if (profile.introVideo) {
            fs.unlinkSync(profile.introVideo)
        }
        if (profile.ProjectImages) {
            profile.ProjectImages.map((file) => {
                return fs.unlinkSync(file);
            })
        }
        await profile.deleteOne();
        res.status(200).json({success: true,message: "profile deleted successfully!! "});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
export default { CreateProfile, getAllProfile, getSingleProfile, DeleteProfile };