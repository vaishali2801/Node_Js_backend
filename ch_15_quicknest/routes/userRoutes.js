
import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import registerSchema from "../validation/registerSchema.js";
import userController from "../controller/userController.js";

const router = express.Router();

router.post("/addUser",validate(registerSchema),userController.addUser);
router.post("/login",userController.login);
router.get("/authLogin",auth,userController.authLogin);
router.post("/logOut",auth,userController.logOut);
router.post("/logOutAll",auth,userController.logOutAll);
router.get("/allUser",auth,userController.allUser);

export default router;