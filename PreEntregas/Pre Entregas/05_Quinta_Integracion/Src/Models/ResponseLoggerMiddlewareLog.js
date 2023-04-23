export default class RequestLoggerMiddlewareLog {
    constructor(responseInput,requestID,responseBody){
        this.Time = new Date().toISOString();
        this.TraceID = requestID;
        this.StatusCode = responseInput.statusCode;
        this.Response = responseBody;
    }
}