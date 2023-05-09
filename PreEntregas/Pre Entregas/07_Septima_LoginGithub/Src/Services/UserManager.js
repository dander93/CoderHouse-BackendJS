import DataAccessService from './DataAccessService.js';
import userSchema from '../Models/Schemes/userSchema.js';

export default class UserManager {

    static #repository;

    constructor() {
        //FIXME: quitar magic strings
        if (!UserManager.#repository) {
            UserManager.#repository = new DataAccessService().getRepository("users", userSchema);
        }

    }

    async createUser(name, lastName, birth, password, mail, role) {
        try {
            const user = await UserManager.#repository.create({
                name: name,
                lastName: lastName,
                birthDate: birth,
                password: password,
                email: mail,
                role: role || 'user'
            });

            return user;
        }
        catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const user = await UserManager.#repository.findOne({ email: email });
            return user;
        }
        catch (error) {
            throw error;
        }
    }
}