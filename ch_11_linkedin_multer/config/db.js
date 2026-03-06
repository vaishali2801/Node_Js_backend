
import mongoose from "mongoose";
async function connectDB() {
    try {
        const connect = await mongoose.connect("mongodb://127.0.0.1:27017/linkedin");
        console.log("db connected successfully");
    } catch (error) {
        // If connection fails → show error message
        console.log("MongoDB connection Failed:", error.message)
        // Stop application
        process.exit(1)
    }
}
export default connectDB;