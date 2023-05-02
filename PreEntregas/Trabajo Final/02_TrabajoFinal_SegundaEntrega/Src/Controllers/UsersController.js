import { Router } from 'express';
import StatusCodes from 'http-status-codes';

const route = Router();

route.get('/login', (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('login', {
                title: 'Login',
                activeLink: null,
                isSocketView: false,
            });
    }
    catch (error) {
        next(error);
    }
});

route.get('/register', (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('register', {
                title: 'Registro',
                activeLink: null,
                isSocketView: false,
            });
    }
    catch (error) {
        next(error);
    }
});

export {
    route as default
};