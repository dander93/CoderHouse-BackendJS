
import MongooseConfiguration from './MongooseConfiguration.js';
import ExpressConfiguration from './ExpressConfiguration.js';
import OauthConfiguration from './OauthConfiguration.js';

export default class ConfigigurationManager {

    static #MONGOOSE_CONFIGURATION;
    static #EXPRESS_CONFIGURATION;
    static #OAUTH_CONFIGURATION;

    MONGOOSE_CONFIGURATION;
    EXPRESS_CONFIGURATION;
    OAUTH_CONFIGURATION;

    constructor() {
        try {
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
            return new MongooseConfiguration();
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