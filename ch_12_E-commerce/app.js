
import express from "express";
import HttpError from "./middleware/HttpError.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
//path
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());
//port
const port = process.env.PORT||5001;
// Routes
app.use("/product",productRouter);

console.log(process.env.MONGO_URI);

//server
app.get("/",(req , res)=>{
    res.status(200).json("hello from server!!!");
});
//undefined route
app.use((req,res,next)=>{
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
        console.log(error.message);
        process.exit(1);
    }
}
//call
startServer();