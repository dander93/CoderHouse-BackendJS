
const endpointAuthRequired = (request, response, next) => {
    if (request.session &&
        request.session.user &&
        request.session.user.mail) {
        return next();
    }

    return response
        .redirect('/login');
};

export {
    endpointAuthRequired as default
};