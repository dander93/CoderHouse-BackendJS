import { MONGOOSE_CONFIGURATION } from "../Models/Constants/Constants.js";
import { messageSchema } from "../Models/Schemes/index.js";
import DataAccessService from "./DataAccessService.js";

export default class ChatManager {

    static #repository;

    constructor() {
        ChatManager.#repository = new DataAccessService()
            .getRepository(MONGOOSE_CONFIGURATION.collections.messages, messageSchema);

        console.info("ChatManager: Configurando repositorio");

        ChatManager.#repository.countDocuments()
            .then(count => {
                if (count === 0) {
                    ChatManager.#repository.create({});
                }
            });

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

            const msg = await this.getMessages();

            msg[0].messages.push({ user, message })

            return await ChatManager.#repository.findByIdAndUpdate(msg[0]._id, msg[0]);
        }
        catch (error) {
            console.log(error)
            throw error;
        }
    }
}