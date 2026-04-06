
import express from "express";
import checkRole from "../middleware/checkRole.js";
import auth from "../middleware/auth.js";
import { updateUserSchema } from "../validation/UserSchema.js";
import categoryController from "../controller/categoryController.js";
import validate from "../middleware/validate.js";
import userController from "../controller/userController.js";

const router = express.Router();

router.patch(
    "/update/:id",
    auth,
    checkRole("admin", "super_admin"),
    validate(updateUserSchema),
    userController.updateUser
); router.patch("/update/:id", validate(updateUserSchema), auth, checkRole("admin", "super_admin"), userController.updateUser);
router.delete("/delete/:id", auth, checkRole("admin", "super_admin"), userController.deleteUser);
router.get("/allUser", auth,checkRole("admin", "super_admin"), userController.allUser);

export default router;