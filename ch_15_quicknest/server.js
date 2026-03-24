import dotenv from "dotenv";
import express from "express";
import HttpError from "./middleware/HttpError";
dotenv.config({ path: "./.env" });

const app = express();

//convert json data
app.use(express.json());

app.get("/",(req,res)=>{
    res.json("hello form server");
});

app.use((req,res,next)=>{
    next(new HttpError("requested route not found",404));
})

app.use((error,req,res,next)=>{
    if(!res.headersSent){
        return next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });

})
const port = process.env.port || 5001;

async function startServer() {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`server running on port ${port}`);
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
startServer();