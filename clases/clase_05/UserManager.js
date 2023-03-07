const fs = require('fs');
const bcrypt = require('bcrypt');

class UserManager {

    #pathToFile

    constructor(pathToFile) {
        this.#pathToFile = pathToFile;

        this.#createFile();
    }

    async #createFile() {
        if (!fs.existsSync(this.#pathToFile)) {
            await fs.promises.writeFile(this.#pathToFile, "[]");
        }
    }


    async crearUsuario(nombre, apellido, nombreUsuario, Password) {
        return ({
            userId: Date.now(),
            nombre,
            apellido,
            nombreUsuario,
            Password
        });
    }

    async #cryptPassword(password) {
        return await bcrypt.hash(password, 3)
    }
}

module.exports = UserManager;