import * as constants from './Src/Models/Constants/Constants.js';
import DataAccessService from './Src/Services/DataAccessService.js';
import SocketServerBuilder from './Src/Services/SocketServerBuilder.js';
import WEbServerBuilder from './Src/Services/WebServerBuilder.js';

try {
    const app = new WEbServerBuilder().getServer();

    const httpServer = app.listen(constants.EXPRESS_CONFIGURATION.EXPRESS_DEFAULT_PORT, () => {
        console.clear();
        console.log(`Servidor Inicializado`);
        console.log(`Servidor escuchando por default en el puerto: '${constants.EXPRESS_CONFIGURATION.EXPRESS_DEFAULT_PORT}'`);
    });

    const socketServ = new SocketServerBuilder(httpServer);
    socketServ.addDefaultEvents();
    socketServ.addChatEvents();
}
catch (err) {
    console.log(err);
    process.exit(1);
}