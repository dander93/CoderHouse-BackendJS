import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import passport from 'passport';
import { endpointAuthRequired } from '../Middlewares/index.js';

const router = Router();

router.get('/github/login', passport.authenticate('github', { scope: ['user:email'] }), async (request, response) => { });

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), async (request, response, next) => {
    try {
        const { _id, __v, password, ...securedUser } = request.user.toObject();

        //TODO: hacer que el usuario cambie los datos default la hora de registrarse con github
        request.session.user = securedUser;

        response
            .status(StatusCodes.TEMPORARY_REDIRECT)
            .redirect('/products');
    }
    catch (error) {
        next(error);
    }
});

router.get('/current', endpointAuthRequired, async (request, response, next) => {
    response
        .status(StatusCodes.OK)
        .json(request.session.user);
});

export {
    router as default
};

