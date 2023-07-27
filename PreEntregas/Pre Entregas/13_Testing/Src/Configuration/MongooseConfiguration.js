import { MONGOOSE_CONFIGURATION_DB_KEY, MONGOOSE_CONFIGURATION_PORT_KEY, MONGOOSE_CONFIGURATION_URL_KEY } from '../Models/Constants/MongooseConfigurationConstants.js';
import { TechnicalException } from '../Models/Exceptions/index.js';
import dotenv from 'dotenv';
import ConfigigurationManager from './ConfigurationManager.js';

export default class MongooseConfiguration {

    #url;
    #port;
    #db;
    collections;
    connectionString;

    constructor(url) {
        try {
            dotenv.config();

            this.#url = url || this.#getUrl();

            ConfigigurationManager.logger.debug(`MongooseConfiguration - url MongoDb ${this.#url}`)
            this.#port = this.#getPort();
            this.#db = this.#getDB();
            this.collections = this.#getCollections();
            this.connectionString = this.#getConnectionString();

            if (!Object.isFrozen(this)) {
                Object.freeze(this);
                ConfigigurationManager.logger.info('MongooseConfiguration - Configuracion finalizada');
            }
        }
        catch (error) {
            throw error;
        }
    }

    #getUrl() {
        try {
            const url = process.env[MONGOOSE_CONFIGURATION_URL_KEY];

            if (!url) {
                throw new TechnicalException('Error al obtener la url de la db', null, 'ERRDBURL500', 500);
            }

            ConfigigurationManager.logger.info('MongooseConfiguration - Url obtenida');
            return url;
        }
        catch (error) {
            throw error;
        }
    }

    #getPort() {
        try {
            const port = process.env[MONGOOSE_CONFIGURATION_PORT_KEY];

            if (!port) {
                throw new TechnicalException('Error al obtener el puerto de la db', null, 'ERRDBPOR500', 500);
            }

            ConfigigurationManager.logger.info(`MongooseConfiguration - Puerto obtenido`);
            return port;
        }
        catch (error) {
            throw error;
        }
    }

    #getDB() {
        try {
            const db = process.env[MONGOOSE_CONFIGURATION_DB_KEY];

            if (!db) {
                throw new TechnicalException('Error al obtener el nombre de la db', null, 'ERRDBNAM500', 500);
            }

            ConfigigurationManager.logger.info('MongooseConfiguration - Db obtenida');
            return db;
        }
        catch (error) {
            throw error;
        }
    }

    #getCollections() {
        try {
            const collectionKeys =
                Object.keys(process.env)
                    .filter(key => key
                        .toLowerCase()
                        .includes('mongoose_collection'));

            if (!collectionKeys) {
                throw new TechnicalException('Error al obtener las colecciones de la db', null, 'ERRDBCOL500', 500);
            }

            const collections = collectionKeys.map(key => process.env[key]);

            ConfigigurationManager.logger.info(`MongooseConfiguration - Colecciones obtenidas: ${collections.length}`);
            return collections;
        }
        catch (error) {
            throw error;
        }
    }

    #getConnectionString() {
        try {
            return `${this.#url}:${this.#port}/${this.#db}?retryWrites=true&w=majority`;
        }
        catch (error) {
            throw error;
        }
    }

}