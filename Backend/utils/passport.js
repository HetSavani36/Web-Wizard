import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.model.js";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      prompt: "select_account",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value?.toLowerCase();

        let user = await User.findOne({ email });
        let isAdmin= false
        if(email=="connectcampus51@gmail.com") isAdmin=true
        if (!user) {
          user = new User({
            googleId: profile.id,
            email: email,
            name: profile.name.familyName,
            avatar: profile.photos?.[0]?.value,
            role: (isAdmin)?"admin" : "customer"
          });
          await user.save();
        }

        return done(null, user);
        
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;