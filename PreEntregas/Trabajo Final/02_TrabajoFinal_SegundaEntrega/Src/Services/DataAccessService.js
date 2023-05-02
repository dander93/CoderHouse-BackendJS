import mongoose from "mongoose";
import ConfigigurationManager from '../Configuration/ConfigurationManager.js';

export default class DataAccessService {

    #configuration;

    #connection;

    constructor() {
        try {

            this.#configuration = new ConfigigurationManager();
            this.#connection =
                this.#getConnection(`${this.#configuration.MONGOOSE_CONFIGURATION.connectionString}`);


        }
        catch (error) {
            throw error;
        }
    }

    #getConnection(cxString) {
        return mongoose.createConnection(cxString);
    }

    #createCollection(schemeName, schemeModel) {
        try {

            const scheme = this.#connection.model(schemeName, schemeModel);

            scheme.createCollection();
        }
        catch (error) {
            throw error;
        }
    }

    getRepository(modelName, scheme) {
        return this.#connection.model(modelName, scheme);
    }

}