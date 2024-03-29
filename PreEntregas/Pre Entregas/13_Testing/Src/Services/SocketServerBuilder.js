import { Server, Socket } from 'socket.io';
import { TechnicalException } from '../Models/Exceptions/index.js';
import ProductManager from './ProductManager.js';
import ChatManager from './ChatManager.js';
import * as constants from '../Models/Constants/Constants.js';
import Product from '../Models/Product.js';
import ConfigigurationManager from '../Configuration/ConfigurationManager.js';


export default class SocketServerBuilder {

    static #httpServerInstance;

    static #productMan;
    static #chatMan;

    constructor(httpServer) {

        if (!httpServer && !SocketServerBuilder.#httpServerInstance) {
            throw new TechnicalException("La instancia del servidor http es obligatoria cuando no existe una previa", null, "ERRHTTPSCKSERV500", 500);
        }

        if (!SocketServerBuilder.#httpServerInstance) {
            SocketServerBuilder.#httpServerInstance = new Server(httpServer);
        }

        if (!SocketServerBuilder.#productMan) {
            SocketServerBuilder.#productMan = new ProductManager();
        }

        if (!SocketServerBuilder.#chatMan) {
            SocketServerBuilder.#chatMan = new ChatManager();
        }
    }

    addDefaultEvents() {
        SocketServerBuilder.#httpServerInstance.on('connection', cx => {

            ConfigigurationManager.logger.http(`Nueva conexión detectada - id: ${cx.id}`);

            cx.on('getProducts', async (data) => {
                try {

                    ConfigigurationManager.logger.http(`Peticion de productos recibida del usuario: ${cx.id}`);

                    let { limit, page, sort, ...query } = data;

                    limit = limit || 10;
                    page = page || 1;

                    const result = await SocketServerBuilder.#productMan.getProducts(limit, page, sort, query);

                    const products = result.docs;

                    SocketServerBuilder.#httpServerInstance.emit(
                        'listProducts',
                        JSON.stringify(products));
                }
                catch (error) {
                    cx.emit('error', JSON.stringify("error"));
                }
            });

            cx.on('createProduct', async (data) => {
                try {
                    ConfigigurationManager.logger.http(`Peticion para crear un producto, request: '${data}'`);

                    const { title, description, code, price, stock, category, thumbnails, status } = JSON.parse(data);

                    await SocketServerBuilder.#productMan.addProduct(
                        new Product(
                            title, description, Number.parseFloat(price), thumbnails, Number.parseInt(stock), code, category, status));

                    SocketServerBuilder.#httpServerInstance.emit('productCreated');
                }
                catch (error) {
                    cx.emit('error', JSON.stringify(error));
                }
            });

            cx.on('deleteProduct', async (productID) => {
                try {

                    ConfigigurationManager.logger.http(`Peticion de borrado sobre el producto id '${productID}' recibida de la conexión : '${cx.id}'`);

                    await SocketServerBuilder.#productMan.deleteProduct(productID);

                    SocketServerBuilder.#httpServerInstance.emit('productDeleted');
                } catch (error) {
                    cx.emit('error', JSON.stringify(error));
                }
            });

        });
    }

    addChatEvents() {
        SocketServerBuilder.#httpServerInstance.on('connection', cx => {
            cx.on('getMessages', async () => {
                try {
                    ConfigigurationManager.logger.http(`Peticion de mensajes recibida del usuario: ${cx.id}`);

                    SocketServerBuilder.#httpServerInstance.emit(
                        'listMessages',
                        JSON.stringify(await SocketServerBuilder.#chatMan.getMessages()));
                }
                catch (error) {
                    cx.emit('error', JSON.stringify(error));
                }
            });

            cx.on('addMessage', async (data) => {
                try {
                    ConfigigurationManager.logger.http(`Peticion de agregar mensaje recibida del usuario: ${cx.id}`);

                    const { user, message } = JSON.parse(data);
                    await SocketServerBuilder.#chatMan.addMessage(user, message);

                    SocketServerBuilder.#httpServerInstance.emit('messageAdded');
                }
                catch (error) {
                    cx.emit('error', JSON.stringify(error));
                }
            });


        });
    }
}