import express from "express";
import studentController from "../controller/studentController.js"

const router = express.Router();

router.post("/", studentController.add);
router.get("/allStudent", studentController.allStudent);
router.get("/students/:id", studentController.studentId);
router.patch("/:id", studentController.updateStudentData);
router.delete("/:id", studentController.deleteStudent);

// router.patch("/:id",updateStudent);

export default router;
