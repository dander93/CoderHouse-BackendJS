import DataAccessService from './DataAccessService.js';
import userSchema from '../Models/Schemes/userSchema.js';
import { cartSchema } from '../Models/Schemes/index.js';

export default class UserManager {

    static #dataAccess;
    static #repository;
    static #cart;
    
    constructor() {
        
        if (!UserManager.#repository) {
            UserManager.#dataAccess = new DataAccessService();
            UserManager.#repository = UserManager.#dataAccess.getRepository('users', userSchema);
            UserManager.#cart = UserManager.#dataAccess.getRepository('carts', cartSchema);
        }

    }

    async createUser(name, lastName, age, password, mail, role, cartID, githubID) {
        try {
            const user = await UserManager.#repository.create({
                first_name: name,
                last_name: lastName,
                age: age,
                password: password,
                email: mail,
                role: role || 'user',
                cart: cartID,
                githubID: githubID || ''
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