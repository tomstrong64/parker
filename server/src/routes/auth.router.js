import { Router } from 'express';
import passport from 'passport';
import * as AuthController from '../controllers/auth.controller.js';

const router = Router();

router.post('/logout', AuthController.logout);

router.get(
    '/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    AuthController.googleCallback
);

export default router;
