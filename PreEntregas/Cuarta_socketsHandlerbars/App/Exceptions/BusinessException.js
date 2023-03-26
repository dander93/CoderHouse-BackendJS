export default class BusinessException extends Error {
    constructor(message, code, codeNumber) {
        super(message);
        this.message = message;
        this.Code = code;
        this.CodeNumber = codeNumber;
        this.ExceptionType = "BusinessException";
    }
}