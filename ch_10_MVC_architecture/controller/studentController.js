import studentModel from "../model/studentModel.js";

const add = async (req, res, next) => {
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
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

export default add;
