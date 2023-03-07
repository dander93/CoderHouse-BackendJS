const UserManager = require('./UserManager')

const FILENAME_PATH = "./Usuarios.json"

const userMan = new UserManager(FILENAME_PATH);


(async () => {
    await userMan.crearUsuario();
})()