export default class TechnicalException extends Error {
    constructor(message, innerException) {
        super(message);
        this.ExceptionType = "TechnicalException";
        this.stack = innerException;
    }
}