
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import express from "express";
import HttpError from "./middleware/HttpError.js";
import router from "./router/userRouter.js";

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use("/user", router);

//server
app.get("/", (req, res) => {
    res.status(200).json("hello from server....!");
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
        await connectDb();
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
//call
startServer();