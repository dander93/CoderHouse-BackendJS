export default class ValidationException extends Error {
    constructor(message) {
        super(message);
        this.ExceptionType = "ValidationException";
    }
}