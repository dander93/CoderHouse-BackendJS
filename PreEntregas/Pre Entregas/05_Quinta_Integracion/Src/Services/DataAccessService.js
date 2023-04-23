import * as constants from '../Models/Constants/Constants.js';
import mongoose from "mongoose";
import productSchema from '../Models/Schemes/productSchema.js'

export default class DataAccessService {

    static #connection;

    constructor() {
        try {

            if (!DataAccessService.#connection) {
                DataAccessService.#connection = this.#getConnection(`${constants.MONGOOSE_CONFIGURATION.connectionString}`);
                console.info(`Connextion creada con '${constants.MONGOOSE_CONFIGURATION.connectionString}'`)
            }

        } catch (error) {
            console.error(error)
        }
    }

    #getConnection(cxString) {
        return mongoose.createConnection(cxString);
    }

    #createCollection(schemeName, schemeModel) {
        try {

            const scheme = DataAccessService.#connection.model(schemeName, schemeModel);

            scheme.createCollection();
        }
        catch (error) {
            console.log(error)
        }
    }

    getRepository(modelName, scheme) {
        return DataAccessService.#connection.model(modelName, scheme);
    }

}