
const validateUserLevel = (validUserLevels) => {
    return (error, request, response, next) => {

        const exist = validUserLevels.find(validLevel => validLevel == request.session.user.role);
        if (!exist) {
            return response
                .status(StatusCodes.TEMPORARY_REDIRECT)
                .redirect('/home');
        }
        next();
    };
};