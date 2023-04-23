export default class ExceptionHandler {

    static #handlers = {
        "ValidationException": (exception) => {
            console.error(exception.message + "\n");

            return exception.message;
        },
        "AggregatedException": (exception) => {
            console.error(`${exception.message}. \n\t${exception.Exceptions.join('\n\t')} \n`);

            return exception.Exceptions;
        },
        "BusinessException": (exception) => {
            console.error(exception.message + "\n");

            return exception.message;
        },
        "TechnicalException": (exception) => {
            console.error(`Message: ${exception.message} \n Stacktrace: ${exception.stack} \n`);

            return exception.message;
        },
        "undefined": (exception) => {
            console.error(exception.message + "\n");

            return exception.message;
        }
    }

    static handle(exception) {
        return this.#getExceptionHandler(exception)(exception);
    }

    static #getExceptionHandler(exception) {
        return ExceptionHandler.#handlers[exception.ExceptionType || 'undefined'];
    }
}