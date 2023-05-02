export default class AggregatedException extends Error {
    constructor(message, exceptions, code, codeNumber) {
        super(message);
        this.message = message;
        this.Exceptions = exceptions;
        this.Code = code;
        this.CodeNumber = codeNumber;
        this.ExceptionType = "AggregatedException";
    }
}