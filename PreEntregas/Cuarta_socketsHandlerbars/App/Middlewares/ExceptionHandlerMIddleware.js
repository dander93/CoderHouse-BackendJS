
import ErrorResponse from '../Models/ErrorResponse.js'
const exceptionHandlerMiddleware = (error, request, response, next) => {

        console.error(error);

        response
                .status(error.CodeNumber || 500)
                .type('json')
                .send(
                        JSON.stringify(
                                new ErrorResponse(error), null, 4));
        next();
};

export default exceptionHandlerMiddleware;