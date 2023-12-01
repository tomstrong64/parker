import GoogleStrategy from 'passport-google-oauth20';

import { User } from '../../models/User.js';

const Strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = User.findOne({ 'google.id': profile.id });

        if (!user) {
            await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                google: {
                    id: profile.id,
                    token: accessToken,
                    accessToken,
                    refreshToken,
                },
            });
        }

        done(null, user);
    }
);

export default Strategy;
