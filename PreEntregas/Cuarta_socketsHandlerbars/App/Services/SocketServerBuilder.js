import { Server } from 'socket.io';
import { TechnicalException } from '../Exceptions/index.js';
import ProductManager from './ProductManager.js';
import * as constants from '../Models/Constants.js';

export default class SocketServerBuilder {

    static #httpServerInstance;

    static #productMan;

    constructor(httpServer) {

        if (!httpServer && !SocketServerBuilder.#httpServerInstance) {
            throw new TechnicalException("La instancia del servidor http es obligatoria cuando no existe una previa", null, "ERRHTTPSCKSERV500", 500);
        }

        if (!SocketServerBuilder.#httpServerInstance) {
            SocketServerBuilder.#httpServerInstance = new Server(httpServer);
        }

        if (!SocketServerBuilder.#productMan) {
            SocketServerBuilder.#productMan = new ProductManager(constants.PRODUCTS_FILE_PATH);
        }

    }

    addDefaultEvents() {
        SocketServerBuilder.#httpServerInstance.on('connection', cx => {

            console.log(`Nueva conexión detectada - id: ${cx.id}`);

            cx.on('getProducts', async () => {
                try {

                    console.log(`Peticion de productos recibida del usuario: ${cx.id}`);

                    SocketServerBuilder.#httpServerInstance.emit(
                        'sendProducts',
                        JSON.stringify(
                            await SocketServerBuilder.#productMan.getProducts()));
                }
                catch (error) {

                }
            });

            cx.on('deleteProduct', async (productID) => {
                try {

                    console.log(`Peticion de borrado sobre el producto id '${productID}' recibida de la conexión : '${cx.id}'`);

                    await SocketServerBuilder.#productMan.deleteProduct(+productID);

                    SocketServerBuilder.#httpServerInstance.emit('productDeleted');
                } catch (error) {
                    next(error);
                }
            });

        });
    }
}