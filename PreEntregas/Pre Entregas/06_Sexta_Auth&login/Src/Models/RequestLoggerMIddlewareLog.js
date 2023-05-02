export default class RequestLoggerMiddlewareLog {
    constructor(requestInput,requestID){
        this.TraceID = requestID;
        this.Time = new Date().toISOString();
        this.Verb = requestInput.method;
        this.URL = requestInput.originalUrl;
        this.Headers = requestInput.headers;
        this.OriginIP = requestInput.headers['x-forwarded-for'] || requestInput.socket.remoteAddress 
    }
}