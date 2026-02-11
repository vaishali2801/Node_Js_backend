// MongoDB is a NoSQL database used to store data in a JSON-like format called BSON (Binary JSON).
//1️⃣ NoSQL (Not Table-Based)
// No fixed structure
// You can add new fields anytime
// 2️⃣ Schema-less
// Documents inside the same collection can be different
// 3️⃣ Fast & Scalable
// Handles large data easily
// Used in big applications
// 4️⃣ Uses JSON Format
// Very friendly with JavaScript & Node.js

//Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
//It acts as a bridge between Node.js and MongoDB.
// Easy data validation
// Schema structure
// Built-in methods
// Middleware (pre, post hooks)
import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/student");
        console.log("mongodb connected");
    } catch (error) {
        console.log("DB connection failed:", error.message);
    }
}

export default connectDB;