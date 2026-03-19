import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/userModel.js";

// const googleAuthStrategy = passportGoogle.Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"/auth/google/redirect"
            
        },
        async(accessToken, refreshToken, profile, done) => {
            let user = await User.findOne({googleID: profile.id });
            if(!user){
                user = await User.create({
                    name:profile.displayName,
                    email:profile.emails?.[0].value,
                    googleID:profile.id
            })
            }
            return done(null, profile);
        }
    )
);
export default passport;