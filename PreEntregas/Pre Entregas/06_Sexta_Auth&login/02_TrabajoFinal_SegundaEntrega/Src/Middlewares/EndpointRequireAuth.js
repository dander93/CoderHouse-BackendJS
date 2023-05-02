import StatusCodes from 'http-status-codes';

const endpointAuthRequired = (request, response, next) => {
    if (request.session &&
        request.session.user &&
        request.session.user.mail) {
        return next();
    }

    return response
        .status(StatusCodes.TEMPORARY_REDIRECT)
        .redirect('/login');
};

export {
    endpointAuthRequired as default
};