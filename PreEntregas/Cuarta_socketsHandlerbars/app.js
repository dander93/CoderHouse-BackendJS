import express from 'express';
import handlebars from 'express-handlebars'
import * as constants from './App/Models/Constants.js';
import { ProductsController, CartsController, HandlebarsController } from './App/Controllers/index.js'
import { endpointLogger, exceptionHandlerMiddleware } from './App/Middlewares/index.js';
import { Server } from 'socket.io';
import validators from './App/Helpers/handlebarsHelpers.js';

/*
TODO: convertir esto a una clase al igual que el socket server
*/


/*
 * Configuracion WebServer
 * */
const app = express();

/*
 * Middlewares
 * */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(endpointLogger);

//configura la carpeta de statics de express
app.use(express.static(constants.APP_PUBLIC_PATH));

/*
 * Configuracion Handlebars
 * */
app.engine('handlebars', handlebars.engine({
    partialsDir: constants.APP_PARTIAL_VIEWS_PATH,
    helpers: validators
}));

app.set('views', constants.APP_VIEWS_PATH);
app.set('view engine', 'handlebars');

/*
 * Configuracion Rutas
 * */
app.use(constants.EXPRESS_PRODUCTS_BASE_ROUTE, ProductsController);
app.use(constants.EXPRESS_CARTS_BASE_ROUTE, CartsController);
app.use(constants.EXPRESS_HANDLEBARS_BASE_ROUTE, HandlebarsController);

/*
 * Middlewares que se ejecutan específicamente en el response luego de express
 * */
app.use(exceptionHandlerMiddleware);

/*
 * Inicio web server
 * */
const httpServer = app.listen(constants.EXPRESS_DEFAULT_PORT, () => {
    console.clear();
    console.log(`Servidor Inicializado`);
    console.log(`Servidor escuchando por default en el puerto: '${constants.EXPRESS_DEFAULT_PORT}'`);
});

/*
 * Configuracion SocketServer
 * */

const socketServer = new Server(httpServer);

socketServer.on('connection', cx => {

    console.log(`Nueva conexión detectada`);
}); 