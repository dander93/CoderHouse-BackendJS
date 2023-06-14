
import MongooseConfiguration from './MongooseConfiguration.js';
import ExpressConfiguration from './ExpressConfiguration.js';
import OauthConfiguration from './OauthConfiguration.js';
import { Command } from 'commander';

export default class ConfigigurationManager {

    static #MONGOOSE_CONFIGURATION;
    static #EXPRESS_CONFIGURATION;
    static #OAUTH_CONFIGURATION;

    static command;

    MONGOOSE_CONFIGURATION;
    EXPRESS_CONFIGURATION;
    OAUTH_CONFIGURATION;

    constructor() {
        try {

            ConfigigurationManager.command = new Command();

            ConfigigurationManager.command
                .option('--url', 'variable para configurar mongo en caso de querer utilizar una distinta a la default', null);

            ConfigigurationManager.command.parse();

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