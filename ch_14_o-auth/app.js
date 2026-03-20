
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import connectDB from "./config/db.js";
import HttpError from "./middleware/HttpError.js";
import authRouter from "./routes/authrouter.js";
import authRouters from "./routes/profileroutes.js"
import express from "express";
import passport from "./config/passport.js";
import session from "express-session";

const app = express();
//convert to object
app.use(express.json());

const port = process.env.PORT || 5001;
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        maxAge:24*60*60*1000,
    }
}))
//for passport
app.use(passport.initialize());
app.use(passport.session());
//for router
app.use("/auth",authRouter);
app.use("/profile",authRouters)


//for ejs
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("home",{user:req.user});
});

//undefined error
app.use((req, res, next) => {
    next(new HttpError("request route not found", 404));
});

//centralized error handling
app.use((error, req, res, next) => {
    if (res.headersSent) {
        next(error);
    }
    res.status(error.statusCode || 500).json({ message: error.message || "internal server error" });
});

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
//call function
startServer();