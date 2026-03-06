//Multer is a Node.js middleware used with Express.js to handle
//file uploads from the client (frontend) to the server (backend).
import express from "express";
import HttpError from "./middleware/HttpError.js"
import connectDB from "./config/db.js"
import profileRoutes from "./routes/profileRoute.js";

const app = express();
const port = 5001;

app.use(express.json());
// Serve uploaded files
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/profile", profileRoutes);

//server
app.get("/",(req,res)=>{
    res.status(200).json("hello from server");
});
//undefined route
app.use((error,req,res,next)=>{
    next(new HttpError("requested route not found", 404));
});
//centralized error handling 
app.use((error, req, res, next) => {
    if (res.headersSent) {
        next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });
});
//start server 
async function startServer() {
    try {
        await connectDB();
        app.listen(port,()=>{
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log("fail to start server:",error.message);
        process.exit(1);
    }
}
//call
startServer();