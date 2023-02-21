export default class AggregatedException extends Error {
    constructor(message, exceptions) {
        super(message);
        this.Exceptions = exceptions;
        this.ExceptionType = "AggregatedException";
    }
}