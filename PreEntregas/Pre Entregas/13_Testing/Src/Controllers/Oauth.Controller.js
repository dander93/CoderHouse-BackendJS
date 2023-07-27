import StatusCodes from 'http-status-codes';
import CurrentUserDTO from '../Models/DTO/currentUser.dto.js';

export const getGithubLogin = async (request, response) => { };

export const getGithubCallback = async (request, response, next) => {
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
};

export const getCurrentUser = async (request, response, next) => {
    response
        .status(StatusCodes.OK)
        .json(new CurrentUserDTO(request.session.user.first_name, request.session.user.last_name, request.session.user.role, request.session.user.email));
    // .json(request.session.user);
};

