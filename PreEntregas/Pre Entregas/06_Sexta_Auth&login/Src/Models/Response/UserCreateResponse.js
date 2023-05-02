import CommonResponse from "./CommonResponse.js";

export default class UserCreateResponse extends CommonResponse {

    constructor(status, message) {
        super(status);
        this.message = message;
    }
}