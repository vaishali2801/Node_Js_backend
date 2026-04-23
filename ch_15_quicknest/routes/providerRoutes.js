
import express from "express";
import providerController from "../controller/providerController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router  = express.Router();

router.post("/registerProvider",auth,providerController.registerAsProvider);
router.get("/getProvider",auth,checkRole("admin","super_admin"),providerController.getProvider);

export default router;