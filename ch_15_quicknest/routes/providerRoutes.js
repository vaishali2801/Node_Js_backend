
import express from "express";
import providerController from "../controller/providerController.js";
import auth from "../middleware/auth.js";
import checkRole from "../middleware/checkRole.js";

const router  = express.Router();

router.post("/registerProvider",auth,providerController.registerAsProvider);
router.get("/getProvider",auth,checkRole("admin","super_admin"),providerController.getProvider);
router.patch("/update-provider",auth,checkRole("admin","super_admin"),providerController.updateProvider);
router.delete("/delete-provider",auth,checkRole("admin","super_admin"),providerController.deleteProvider);
router.get("/getBookingProvider",auth,checkRole("provider"),providerController.getProviderBooking);
router.get("/getBookingProvider/:id",auth,checkRole("admin","super_admin"),providerController.getProviderBooking);
export default router;