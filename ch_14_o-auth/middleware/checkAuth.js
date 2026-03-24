import HttpError from "./HttpError.js";


const checkAuth = async(req,res,next)=>{
    try {
        if(!req.user){
            res.render("login");
        // return next(new HttpError("please login"));
    }
    next();
    } catch (error) {
        next(new HttpError(error.message));
    }
}

export default checkAuth;