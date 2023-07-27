import { EXPRESS_PORT_KEY } from '../Models/Constants/ExpressConfigurationConstants.js';
import dotenv from 'dotenv';
import ConfigigurationManager from './ConfigurationManager.js';

export default class ExpressConfiguration {

    PORT;
    PRODUCTS_BASE_ROUTE;
    CARTS_BASE_ROUTE;
    HANDLEBARS_BASE_ROUTE;
    USERS_BASE_ROUTE;
    DOCUMENTATION_BASE_ROUTE;
    
    constructor() {
        dotenv.config();
        
        this.PORT = this.#getPort();
        this.PRODUCTS_BASE_ROUTE = '/api/products';
        this.CARTS_BASE_ROUTE = '/api/carts';
        this.HANDLEBARS_BASE_ROUTE = '/';
        this.USERS_BASE_ROUTE = '/';
        this.OAUTH_BASE_ROUTE = '/api/sessions'
        this.DOCUMENTATION_BASE_ROUTE = '/docs'

        if (!Object.isFrozen(this)) {
            Object.freeze(this);
        }

    }

    #getPort() {
        try {
            const port = process.env[EXPRESS_PORT_KEY];

            if (!port) {
                throw new TechnicalException('Error al obtener el nombre de la db', null, 'ERREXPRT500', 500);
            }

            ConfigigurationManager.logger.info('ExpressConfiguration - Puerto obtenido');
            return port;
        }
        catch (error) {
            throw error;
        }
    }
}