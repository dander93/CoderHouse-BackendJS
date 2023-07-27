import { Router } from 'express';
import StatusCodes from 'http-status-codes';
import passport from 'passport';
import UserCreateResponse from '../Models/Response/UserCreateResponse.js';


const router = Router();

export const getRegister = (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('register', {
                title: 'Registro',
                activeLink: null,
                isSocketView: false,
                script: '/assets/js/user.register.js'
            });
    }
    catch (error) {
        next(error);
    }
};

export const postRegister = (request, response, next) => {
    passport.authenticate('register', { session: true },
        (error, user, information) => {
            try {

                if (error) {
                    return next(error);
                }

                if (!user) {
                    return response
                        .status(StatusCodes.UNAUTHORIZED)
                        .json(new UserCreateResponse('failure', information.message));
                }

                response
                    .status(StatusCodes.CREATED)
                    .send(
                        new UserCreateResponse('success', 'usuario creado con exito'));
            }
            catch (error) {
                next(error);
            }
        })(request, response, next);
};

export const getLogin = (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('login', {
                title: 'Login',
                activeLink: null,
                isSocketView: false,
                script: '/assets/js/user.login.js'
            });
    }
    catch (error) {
        next(error);
    }
};

export const postLogin = (request, response, next) => {
    passport.authenticate('login', { session: true },
        (error, user, information) => {
            try {
                if (error) {
                    return response
                        .redirect('/login');
                }

                if (!user) {
                    return response
                        .status(StatusCodes.UNAUTHORIZED)
                        .redirect('/login');
                    // .send(new UserCreateResponse('failure', information.message));
                }

                response
                    .status(StatusCodes.OK)
                    .redirect('/products');
            }
            catch (error) {
                next(error);
            }
        })(request, response, next);
};

export const getLogout = (request, response, next) => {
    try {

        request.session.destroy();

        response
            .status(StatusCodes.TEMPORARY_REDIRECT)
            .redirect('/login');

    } catch (error) {
        next(error);
    }
};

export {
    router as default
};