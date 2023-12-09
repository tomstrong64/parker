import express from 'express';
import helmet from 'helmet';

import session from 'express-session';
import passport from 'passport';
import Google from './middleware/Passport/Google.js';

import AuthRouter from './routes/auth.router.js';
import UserRouter from './routes/user.router.js';
import APIRouter from './routes/api.router.js';
import HealthRouter from './routes/health.router.js';

// TODO: figure out why the fuck this is necessary
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
/////

const app = express();

app.use(helmet());

passport.use(Google);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: true,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    return res.sendStatus(401);
}

// CSP to allow leaflet script and css to be loaded into client
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' https://unpkg.com; style-src 'self' https://unpkg.com;"
    );
    next();
});
// serve client files
app.use(express.static(path.join(__dirname, '../client/build')));

// handle json and form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/auth', AuthRouter);
app.use('/user', ensureAuth, UserRouter);
app.use('/api', ensureAuth, APIRouter);
app.use('/health', HealthRouter);

export default app;
