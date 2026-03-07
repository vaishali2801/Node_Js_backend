
import express from "express";
import uploads from "../middleware/upload.js"
import productController from "../controller/productController.js";

const router = express.Router();
router.post("/add", uploads.single("image"), productController.CreateProduct);
router.get("/allProducts", productController.GetAllProduct);
router.get("/:id", productController.GetSingleProduct);
router.delete("/:id", productController.DeleteProduct);
router.patch("/:id",uploads.single("image"),productController.updateProductData);

export default router;