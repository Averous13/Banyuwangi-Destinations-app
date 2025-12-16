import express from 'express';
import passport from 'passport';
import authMiddleware from '../middleware/auth.js';
import AuthController from '../controllers/AuthController.js';

const route = express.Router()

route.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false
}));

route.get('/google/callback', passport.authenticate('google', {
    // eslint-disable-next-line no-undef
    failureRedirect: `${process.env.CLIENT_URL}/login?error=auth_failed`,
    session: false
}), AuthController.googleCallback);    

route.get('/current-user', authMiddleware, AuthController.getCurrentUser);
route.post('/logout', AuthController.logOut);
route.post('/verify', authMiddleware, AuthController.verifyToken);
route.put('/profile', authMiddleware, AuthController.updateProfile);
route.delete('/account', authMiddleware, AuthController.deleteAccount);

export default route;