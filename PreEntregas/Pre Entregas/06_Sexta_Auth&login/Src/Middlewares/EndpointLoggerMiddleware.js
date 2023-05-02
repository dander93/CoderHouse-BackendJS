import RequestLoggerMiddlewareLog from '../Models/RequestLoggerMIddlewareLog.js';
import ResponseLoggerMiddlewareLog from '../Models/ResponseLoggerMiddlewareLog.js'
import { randomUUID } from 'crypto'

const endpointLogger = (request, response, next) => {

    let requestID = randomUUID();

    console.log(
        JSON.stringify(
            new RequestLoggerMiddlewareLog(request, requestID)))

    next();

    let defaultSend = response.send;
    response.send =
        responseBody => {

            console.log(
                JSON.stringify(
                    new ResponseLoggerMiddlewareLog(response, requestID, responseBody)));

            response.send = defaultSend;
            return response.send(responseBody);
        }
}

export default endpointLogger;