import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import passport from 'passport';

const router = Router();

router.get('/github/login', passport.authenticate('github', { scope: ['user:email'] }), async (request, response) => { });

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), async (request, response, next) => {
    try {
        //TODO: hacer que el usuario cambie los datos default la hora de registrarse con github
        request.session.user = {
            role: request.user.role,
            name: `${request.user.name} ${request.user.lastName}`,
            mail: request.user.email
        };
        response.redirect('/products');
    }
    catch (error) {
        next(error);
    }
});


export {
    router as default
};

