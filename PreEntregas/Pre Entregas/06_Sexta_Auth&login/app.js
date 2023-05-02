import ConfigigurationManager from './Src/Configuration/ConfigurationManager.js';
import SocketServerBuilder from './Src/Services/SocketServerBuilder.js';
import WEbServerBuilder from './Src/Services/WebServerBuilder.js';

try {

    const app =
        new WEbServerBuilder()
            .getServer();

    const configuration =
        new ConfigigurationManager();

    const httpServer =
        app.listen(
            configuration.EXPRESS_CONFIGURATION.PORT,
            () => {
                console.clear();
                console.log(`Servidor inicializado`);
                console.log(`Servidor escuchando por default en el puerto: '${configuration.EXPRESS_CONFIGURATION.PORT}'`);
            });

    const socketServ = new SocketServerBuilder(httpServer);
    socketServ.addDefaultEvents();
    socketServ.addChatEvents();
}
catch (err) {
    console.log(err);
    process.exit(1);
}