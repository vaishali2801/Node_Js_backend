
import HttpError from "../middleware/HttpError.js";
import Product from "../model/product.js";
import cloudinary from "../config/cloudinary.js";

//CREATE PRODUCT
const CreateProduct = async (req, res, next) => {
    try {
        const { name, description, price, category } = req.body;
        if (!req.file) {
            return next(new HttpError("image is required", 400));
        }
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            image: req.file.path,
            cloudinary_id: req.file.filename
        });
        await newProduct.save();
        res.status(201).json({ success: true, message: "product created successfully!!", product: newProduct });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
//GET ALL PRODUCT
const GetAllProduct = async (req, res, next) => {
    try {
        const products = await Product.find({});
        if (products.length === 0) {
            res.status(200).json({ message: "no product data found" });
        }
        res.status(200).json({ success: true, message: "product data fetched successfully!", products });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
//GET ONLY SINGLE PRODUCT USING ID
const GetSingleProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return next(new HttpError("product not found with this id", 404));
        }
        res.status(200).json({ success: true, message: "product find successfully with this id", product });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
//DELETE PRODUCT
const DeleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new HttpError("product not found!!", 404));
        }
        await cloudinary.uploader.destroy(product.cloudinary_id);
        await product.deleteOne();
        res.status(200).json({ success: true, message: "product deleted successfully!!" });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
//UPDATE PRODUCT DATA 
const updateProductData = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new HttpError("product not found", 404));
        }
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "price", "description", "category"];

        const isValidUpdates = updates.every((f) => {
            return allowedUpdates.includes(f);
        });
        if (!isValidUpdates) {
            return next(new HttpError("only allowed fields can be updated", 404))
        }
        updates.forEach((u) => {
            product[u] = req.body[u];
        });

        if (req.file) {
            await cloudinary.uploader.destroy(product.cloudinary_id);
            product.image = req.file.path;
            product.cloudinary_id = req.file.filename;
        }
        await product.save();
        res.status(200).json({success:true,message:"product updated successfully!",product});
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
}
export default { CreateProduct, GetAllProduct, GetSingleProduct, DeleteProduct, updateProductData }