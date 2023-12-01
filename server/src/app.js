import express from 'express';
import helmet from 'helmet';

import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import Google from './middleware/Passport/Google.js';

import APIRouter from './routes/api.router.js';
import AuthRouter from './routes/auth.router.js';
import HealthRouter from './routes/health.router.js';

// TODO: figure out why the fuck this is necessary
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/////

const app = express();

app.use(helmet());

app.use(express.static(path.join(__dirname, '../client/build')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 14, // 2 weeks
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(Google);

app.use('/auth', AuthRouter);
app.use('/api', APIRouter);
app.use('/health', HealthRouter);

export default app;
