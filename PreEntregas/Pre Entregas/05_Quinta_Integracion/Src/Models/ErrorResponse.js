export default class ErrorResponse {
    constructor(error) {
        this.Code = error.code;
        this.Message = error.message;
        this.Errors = error.Exceptions?.map(exception => exception.message);
    }
}