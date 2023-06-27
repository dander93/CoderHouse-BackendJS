
import MongooseConfiguration from './MongooseConfiguration.js';
import ExpressConfiguration from './ExpressConfiguration.js';
import OauthConfiguration from './OauthConfiguration.js';
import { Command } from 'commander';
import LoggerService from '../Services/LoggerService.js';

export default class ConfigigurationManager {

    static #MONGOOSE_CONFIGURATION;
    static #EXPRESS_CONFIGURATION;
    static #OAUTH_CONFIGURATION;

    static command;

    static logger;

    MONGOOSE_CONFIGURATION;
    EXPRESS_CONFIGURATION;
    OAUTH_CONFIGURATION;

    constructor() {
        try {



            ConfigigurationManager.command = new Command();

            ConfigigurationManager.command
                .option('--url <url>', 'variable para configurar MongoDB en caso de querer utilizar una distinta a la default', null)
                .option('--env <environment>', 'variable para configurar el entorno de la aplicacion. "dev" para desarrollo y "prd" para producción',/^(dev|prd)$/i, 'dev')
                .option('--log <level>', 'variable para configurar la ruta de los logs', './logs/errors.log');

            ConfigigurationManager.command.parse();

            if (!ConfigigurationManager.logger) {
                const logService = new LoggerService(`${ConfigigurationManager.command.opts().log}`);

                if (ConfigigurationManager.command.opts().env == 'prd') {
                    ConfigigurationManager.logger = logService.buildProductionLogger();
                }
                else {
                    ConfigigurationManager.logger = logService.buildDevelopmentLogger();
                }

                ConfigigurationManager.logger.info(`ConfigurationManager - Entorno: ${ConfigigurationManager.command.opts().env}`)
            }
            
            if (!ConfigigurationManager.#EXPRESS_CONFIGURATION) {
                ConfigigurationManager.#EXPRESS_CONFIGURATION = this.#getExpressConfiguration();
            }
            
            if (!ConfigigurationManager.#MONGOOSE_CONFIGURATION) {
                ConfigigurationManager.#MONGOOSE_CONFIGURATION = this.#getMongooseConfiguration();
            }
            
            if (!ConfigigurationManager.#OAUTH_CONFIGURATION) {
                ConfigigurationManager.#OAUTH_CONFIGURATION = this.#getOauthConfiguration();
            }
            
            this.MONGOOSE_CONFIGURATION = ConfigigurationManager.#MONGOOSE_CONFIGURATION;
            this.EXPRESS_CONFIGURATION = ConfigigurationManager.#EXPRESS_CONFIGURATION;
            this.OAUTH_CONFIGURATION = ConfigigurationManager.#OAUTH_CONFIGURATION;
            
            
        }
        catch (error) {
            throw error;
        }
    }

    #getMongooseConfiguration() {
        try {
            return new MongooseConfiguration(ConfigigurationManager.command.opts().url);
        }
        catch (error) {
            throw error;
        }
    }

    #getExpressConfiguration() {
        try {
            return new ExpressConfiguration();
        }
        catch (error) {
            throw error;
        }
    }

    #getOauthConfiguration() {
        try {
            return new OauthConfiguration();
        }
        catch (error) {
            throw error;
        }
    }
}