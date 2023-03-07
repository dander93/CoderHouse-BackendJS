export default class ExceptionHandler {

    static #handlers = {
        "ValidationException": (exception) => {
            console.error(exception.message + "\n");
        },
        "AggregatedException": (exception) => {
            console.error(`${exception.message}. \n\t${exception.Exceptions.join('\n\t')} \n`);
        },
        "BusinessException": (exception) => {
            console.error(exception.message + "\n")
        },
        "TechnicalException": (exception) => {
            console.error(`Message: ${exception.message} \n Stacktrace: ${exception.stack} \n`);
        },
        "undefined": (exception) => {
            console.error(exception.message + "\n");
        }
    }

    static handle(exception) {
        this.#getExceptionHandler(exception)(exception);
    }

    static #getExceptionHandler(exception) {
        return ExceptionHandler.#handlers[exception.ExceptionType || 'undefined'];
    }
}