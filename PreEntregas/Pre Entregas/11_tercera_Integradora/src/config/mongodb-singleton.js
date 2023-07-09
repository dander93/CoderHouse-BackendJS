import mongoose from "mongoose";
import config from "./config.js";

export default class MongoConnectionSingleton {

    static #connection;

    static async #connectMongoDB() {
        try {
            console.log("Conectado con exito a MongoDB usando Moongose.");
            return await mongoose.connect(config.mongoUrl);
        } catch (error) {
            console.error("No se pudo conectar a la BD usando Moongose: " + error);
            process.exit(99);
        }
    };

    static async getMongoConnection() {
        if (!MongoConnectionSingleton.#connection) {
            MongoConnectionSingleton.#connection = await MongoConnectionSingleton.#connectMongoDB();
        }

        return MongoConnectionSingleton.#connection;
    }

}