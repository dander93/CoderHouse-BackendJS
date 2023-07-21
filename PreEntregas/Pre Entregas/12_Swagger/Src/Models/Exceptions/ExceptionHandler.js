import ConfigigurationManager from "../../Configuration/ConfigurationManager";

export default class ExceptionHandler {

    static #handlers = {
        "ValidationException": (exception) => {
            ConfigigurationManager.logger.info(exception.message + "\n");

            return exception.message;
        },
        "AggregatedException": (exception) => {
            ConfigigurationManager.logger.error(`${exception.message}. \n\t${exception.Exceptions.join('\n\t')} \n`);

            return exception.Exceptions;
        },
        "BusinessException": (exception) => {
            ConfigigurationManager.logger.info(exception.message + "\n");

            return exception.message;
        },
        "TechnicalException": (exception) => {
            ConfigigurationManager.logger.error(`Message: ${exception.message} \n Stacktrace: ${exception.stack} \n`);

            return exception.message;
        },
        "undefined": (exception) => {
            ConfigigurationManager.logger.fatal(exception.message + "\n");

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