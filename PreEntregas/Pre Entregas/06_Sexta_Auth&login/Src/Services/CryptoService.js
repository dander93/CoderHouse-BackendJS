import bcrypt from 'bcrypt';

export default class CryptoService {

    static async passwordToHash(password) {
        return await bcrypt.hash(password, await bcrypt.genSalt(10));
    }

    static async comparePassword(password, userPassword) {
        return await bcrypt.compare(password, userPassword);
    }
}