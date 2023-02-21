export default class BusinessException extends Error {
    constructor(message) {
        super(message);
        this.ExceptionType = "BusinessException";
    }
}