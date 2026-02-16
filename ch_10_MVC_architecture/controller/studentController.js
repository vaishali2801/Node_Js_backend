import studentModel from "../model/studentModel.js";

// ADD STUDENT
export const add = async (req, res) => {
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
export const allStudent = async (req, res) => {
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
export const studentId = async (req, res) => {
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
