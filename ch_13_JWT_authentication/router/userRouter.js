
import express from "express";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/add",userController.addUser);
router.post("/login",userController.login);
router.get("/allUser",userController.getAllUser);
router.get("/:id",userController.getUserById);
router.delete("/:id",userController.deleteUser);
router.patch("/:id",userController.updateUser);

export default router;