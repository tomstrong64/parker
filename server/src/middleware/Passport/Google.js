import GoogleStrategy from 'passport-google-oauth20';

import { User } from '../../models/User.js';

const callbackURL =
    process.env.NODE_ENV === 'production'
        ? 'https://tomstrong.dev/auth/google/callback'
        : '/auth/google/callback';

const Strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({ 'google.id': profile.id });

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
