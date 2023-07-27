import winston from 'winston';

export default class LoggerService {

    static #logsRoute;

    constructor(logsRotue) {
        if (!LoggerService.#logsRoute) {
            LoggerService.#logsRoute = logsRotue;
        }
    }

    getLoglevels() {
        return ({
            fatal: 0,
            error: 1,
            warning: 2,
            info: 3,
            http: 4,
            debug: 5
        });
    }

    getLogLevelColors() {
        return ({
            fatal: 'red',
            error: 'red',
            warning: 'yellow',
            info: 'blue',
            http: 'yellow',
            debug: 'white'
        });
    }

    configureConsoleColors() {
        const levels = this.getLoglevels();
        const levelColors = this.getLogLevelColors();

        Object.keys(levels).forEach((level) => {
            const color = levelColors[level];
            winston.addColors({ [level]: color });
        });
    }

    buildDevelopmentLogger() {
        return winston.createLogger({
            levels: this.getLoglevels(),
            transports: [
                new winston.transports.Console({
                    level: "debug",
                    format: winston.format.combine(
                        winston.format.colorize({ colors: this.getLogLevelColors() }),
                        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS' }),
                        winston.format.printf(
                            ({ level, message, timestamp }) => {
                                return `[${timestamp}] ${level}: ${message}`;
                            })
                    )
                })
            ]
        });
    }

    buildProductionLogger() {

        return winston.createLogger({
            levels: this.getLoglevels(),
            transports: [
                new winston.transports.Console({
                    level: "info",
                    format: winston.format.combine(
                        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS' }),
                        winston.format.printf(
                            ({ level, message, timestamp }) => {
                                return `[${timestamp}] ${level}: ${message}`;
                            }),
                        winston.format.json()
                    )
                }),
                new winston.transports.File({
                    level: 'info',
                    filename: LoggerService.#logsRoute,
                    format: winston.format.combine(
                        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS' }),
                        winston.format.printf(
                            ({ level, message, timestamp }) => {
                                return `[${timestamp}] ${level}: ${message}`;
                            }),
                        winston.format.json())
                })
            ]
        });
    }

}