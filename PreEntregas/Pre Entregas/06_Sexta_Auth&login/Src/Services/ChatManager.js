import { messageSchema } from "../Models/Schemes/index.js";
import DataAccessService from "./DataAccessService.js";

export default class ChatManager {

    static #repository;

    constructor() {
        ChatManager.#repository = new DataAccessService()
            //FIXME: quitar magic string
            .getRepository("messages", messageSchema);

        console.info("ChatManager: Configurando repositorio");
    }

    async getMessages() {
        try {
            return await ChatManager.#repository.find();
        }
        catch (error) {
            throw error;
        }
    }

    async addMessage(user, message) {
        try {

            return await ChatManager.#repository.create({
                'user': user,
                'message': message
            });
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }
}