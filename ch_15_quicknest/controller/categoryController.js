
import HttpError from "../middleware/HttpError.js";
import Category from "../model/category.js";

const addBlog = async (req, res, next) => {
    try {
        const { name,description } = req.body;
        const newCategory =await Category.create({
            name,
            description
        });
        res.status(201).json({ success: true,message:" added successfully", newCategory });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};
export default {addBlog};