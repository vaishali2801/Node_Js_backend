
import express from "express";
import userController from "../controller/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/add",userController.addUser);
router.post("/login",userController.login);
router.get("/allUser",userController.getAllUser);

router.get("/authLogin",auth,userController.authLogin);
router.post("/LogOut",auth,userController.LogOut);
router.post("/LogOutAll",auth,userController.LogOutAll);
router.delete("/delete",auth,userController.deleteUser);
router.patch("/update",auth,userController.updateUser);

router.get("/:id",userController.getUserById);

export default router;