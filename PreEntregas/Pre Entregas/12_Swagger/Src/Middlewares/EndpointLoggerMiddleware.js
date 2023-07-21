import ConfigigurationManager from '../Configuration/ConfigurationManager.js';
import RequestLoggerMiddlewareLog from '../Models/RequestLoggerMIddlewareLog.js';
import ResponseLoggerMiddlewareLog from '../Models/ResponseLoggerMiddlewareLog.js';
import { randomUUID } from 'crypto';

const endpointLogger = (request, response, next) => {

    let requestID = randomUUID();

    ConfigigurationManager.logger.http(
        JSON.stringify(
            new RequestLoggerMiddlewareLog(request, requestID)));

    next();

    let defaultSend = response.send;
    response.send =
        responseBody => {

            ConfigigurationManager.logger.http(
                JSON.stringify(
                    new ResponseLoggerMiddlewareLog(response, requestID, responseBody)));

            response.send = defaultSend;
            return response.send(responseBody);
        };
};

export default endpointLogger;