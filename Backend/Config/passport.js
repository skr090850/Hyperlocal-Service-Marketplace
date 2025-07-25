import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../Models/User.js'; // Ensure this path is correct
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure this path correctly points to your .env file relative to this file's location
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Verify environment variables are loaded (optional, for debugging)
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('BACKEND_URL:', process.env.BACKEND_URL);
// console.log('JWT_SECRET:', process.env.JWT_SECRET);


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${process.env.BACKEND_URL}/api/users/oauth/google/callback`, // Corrected
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                if (!profile.emails || profile.emails.length === 0) {
                    return done(new Error("No email found in Google profile"), null);
                }
                const userEmail = profile.emails[0].value;

                let user = await User.findOne({ email: userEmail });

                if (!user) {
                    user = await User.create({
                        name: profile.displayName || 'User', // Fallback if displayName is missing
                        email: userEmail,
                        // For OAuth users, password isn't used for login via Google.
                        // This placeholder helps satisfy schema requirements if 'password' is required.
                        password: `oauth_google_${Date.now()}_${Math.random()}`, // More unique placeholder
                        role: 'user', // Default role
                        // You might want to store googleId if you plan to link accounts or for reference
                        // googleId: profile.id,
                    });
                }

                // Generate JWT for your application's session management
                const payload = {
                    id: user._id,
                    // you can add other relevant info like role if needed by frontend/other services
                    // role: user.role 
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: '1h', // Or your desired expiration
                });

                // Attach the generated token to the user object so it's available in req.user in the route handler
                // This does NOT save the token to the database user document unless your schema has a 'token' field
                // and you explicitly call user.save() later (which is not typical for session tokens).
                const userWithToken = {
                    ...user.toObject(), // Get a plain object if 'user' is a Mongoose document
                    token: token
                };

                return done(null, userWithToken); // Pass the user object (with token) to Passport

            } catch (error) {
                console.error('Error in Google OAuth Strategy:', error);
                return done(error, null);
            }
        }
    )
);

