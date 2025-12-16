/* eslint-disable no-undef */
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${process.env.PORT || 5000}/api/auth/google/callback`
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });

                //jika user sudah ada, update data profile
                if (user) {
                    user.profile.name = profile.displayName;
                    user.profile.avatar = profile.photos[0]?.value || '';
                    await user.save();

                    return done(null, user);
                }

                const existingEmailUser = await User.findOne({
                    email: profile.emails[0].value
                })

                // jika email user sudah terdaftar
                if(existingEmailUser) {
                    existingEmailUser.googleId = profile.id;
                    existingEmailUser.profile.avatar = profile.photos[0]?.value || '';
                    await user.save();

                    return done(null, existingEmailUser);
                }

                let userName = profile.emails[0].value.split('@')[0];

                // jika username sudah ada, tambahkan suffix
                const existingUserName = await User.findOne({userName});
                if(existingUserName) {
                    userName= `${userName}_${Date.now()}`;
                }

                user = await User.create({
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    userName: userName,
                    profile: {
                        name: profile.displayName,
                        alamat: '',
                        phone: '',
                        pekerjaan: '',
                        avatar: profile.photos[0]?.value || ''
                    }
                });

                done(null, user);
            }catch(error) {
                done(error, null);
            }
        }
    )
);

export default passport;