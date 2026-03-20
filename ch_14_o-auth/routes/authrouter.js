import passport from "passport";
import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/google",passport.authenticate("google",{
    scope:["email","profile"]
}));

router.get("/google/redirect",passport.authenticate("google",{
    failureRedirect:"/",
    session:false,
}),(req, res) => {
        res.render("profile");
    }
);
export default router;

