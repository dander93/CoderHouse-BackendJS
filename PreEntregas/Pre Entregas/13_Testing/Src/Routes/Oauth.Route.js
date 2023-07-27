import { Router } from 'express';
import { getCurrentUser, getGithubCallback, getGithubLogin } from '../Controllers/Oauth.Controller.js';
import passport from 'passport';
import { endpointAuthRequired } from '../Middlewares/index.js';

const route = Router();

route.get('/github/login', passport.authenticate('github', { scope: ['user:email'] }), getGithubLogin);
route.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), getGithubCallback);
route.get('/current', endpointAuthRequired, getCurrentUser);

export {
    route as default
};