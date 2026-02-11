
import express from "express";
import connectDB from "./db/mongoose.js";
import HttpError from "./middleware/HttpError.js";

const app = express();
app.use(express.json());

const port = 5002;

app.get("/", (req, res) => {
    res.status(200).json("hello from server");
});

//undefined route
app.use((req,res,next)=>{
    next(new HttpError("route not found",404));
});
//centralized error handling 
app.use((error,req,res,next)=>{
    res.status(error.statusCode || 500).json({message:error.message||"internal server error"});
});
//start server
async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
        console.log(`Server running on port ${port}`);
})
    } catch (error) {
        console.log("fail to start server:",error.message);
        process.exit(1);
    }
}
//call function
startServer();