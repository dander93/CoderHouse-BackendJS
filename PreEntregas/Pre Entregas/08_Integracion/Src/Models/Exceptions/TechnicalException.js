export default class TechnicalException extends Error {
    constructor(message, innerException, code, codeNumber) {
        super(message);
        this.message = message;
        this.Code = code;
        this.CodeNumber = codeNumber;
        this.stack = innerException;
        this.ExceptionType = "TechnicalException";
    }
}