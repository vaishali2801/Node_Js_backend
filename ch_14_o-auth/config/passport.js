import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:process.env.URL
            
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log("profile",profile); 
            return done(null, profile);
        }
    )
);
export default passport;