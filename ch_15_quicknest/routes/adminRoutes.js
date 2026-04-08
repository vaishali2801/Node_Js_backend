
import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";
import { updateUserSchema } from "../validation/UserSchema.js";
import categoryController from "../controller/categoryController.js";
import validate from "../middleware/validate.js";
import userController from "../controller/userController.js";
import serviceController from "../controller/serviceController.js";
import categorySchema from "../validation/categorySchema.js";

const router = express.Router();

router.patch("/update/:id",auth,checkRole("admin", "super_admin"),validate(updateUserSchema),userController.updateUser);
router.delete("/delete/:id", auth, checkRole("admin", "super_admin"), userController.deleteUser);
router.get("/allUser", auth,checkRole("admin", "super_admin"), userController.allUser);

//category
router.post("/addCategory",auth,checkRole("admin","super_admin"),validate(categorySchema),categoryController.add);
router.post("/addService",auth,checkRole("admin","super_admin"),serviceController.add);

export default router;