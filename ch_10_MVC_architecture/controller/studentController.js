import studentModel from "../model/studentModel.js";
import HttpError from "../middleware/HttpError.js";

// ADD STUDENT
const add = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, course } = req.body;

        const newStudent = new studentModel({
            firstName,
            lastName,
            email,
            phoneNumber,
            course
        });

        await newStudent.save();

        res.status(201).json({
            message: "Student added!",
            student: newStudent
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET ALL STUDENTS
const allStudent = async (req, res) => {
    try {
        const students = await studentModel.find({});

        res.status(200).json({
            message: "Successfully fetched students",
            students
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// GET STUDENT BY ID
const studentId = async (req, res) => {
    try {
        const id = req.params.id;

        const student = await studentModel.findById(id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student found",
            student
        });
    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
};

//UPDATE STUDENT 
// manually update you have to do this always
const updateStudentData = async (req, res, next) => {
    try {
        const id = req.params.id;
        const existingStudent = await studentModel.findById(id);
        if (!existingStudent) {
            return next(new HttpError("Student not found", 404));
        }
        const updates = Object.keys(req.body);
            const allowedUpdates = ["firstName", "lastName","email", "phoneNumber", "course"];

        const isValidUpdates = updates.every((field) => {
            return allowedUpdates.includes(field);
        });
        if (!isValidUpdates) {
            return next(new HttpError("only allowed field can be updated", 400));
        }
        updates.forEach((update) => {
            existingStudent[update] = req.body[update];
        });
        await existingStudent.save();
        res
            .status(200)
            .json({ message: "student data updated successfully", existingStudent });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};
//UPDATE STUDENT DATA
const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateStudentData = await studentModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            },
        );
        if (!updateStudentData) {
            return next(new HttpError("failed to update student data", 404));
        }
        res.status(200).json({
            message: "student data updated successfully",
            updateStudentData,
        });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};
//DELETE
const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const deletedStudent = await studentModel.findByIdAndDelete(id);
        if (!deletedStudent) {
            return next(new HttpError("student not found", 404));
        }
        res.status(200).json({ message: "student data deleted successfully" });
    } catch (error) {
        next(new HttpError(error.message, 500));
    }
};

export default {add,allStudent,studentId,updateStudentData,updateStudent,deleteStudent}