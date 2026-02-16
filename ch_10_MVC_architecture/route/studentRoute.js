import express from "express";
import { allStudent, add, studentId } from "../controller/studentController.js";

const router = express.Router();

router.post("/", add);
router.get("/allStudent", allStudent);
router.get("/students/:id", studentId);

export default router;
