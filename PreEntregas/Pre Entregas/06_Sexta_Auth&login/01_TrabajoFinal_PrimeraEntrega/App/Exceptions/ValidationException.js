export default class ValidationException extends Error {
    constructor(message) {
        super(message);
        this.Code = "ERRVALIDATION";
        this.CodeNumber = 400;
        this.ExceptionType = "ValidationException";
    }
}