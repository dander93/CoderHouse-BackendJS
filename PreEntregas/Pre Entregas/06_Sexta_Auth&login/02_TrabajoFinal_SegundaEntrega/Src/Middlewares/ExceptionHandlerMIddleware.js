import ErrorResponse from '../Models/ErrorResponse.js'
import StatusCodes from 'http-status-codes'

const exceptionHandlerMiddleware = (error, request, response, next) => {

        response
                .status(error.CodeNumber || StatusCodes.INTERNAL_SERVER_ERROR)
                .type('json')
                .send(
                        JSON.stringify(
                                new ErrorResponse(error), null, 4));
        next();
};

export default exceptionHandlerMiddleware;