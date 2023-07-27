import { Router } from 'express';
import { PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js';
import ProductManager from '../Services/ProductManager.js';
import StatusCodes from 'http-status-codes';
import endpointAuthRequired from '../Middlewares/EndpointRequireAuth.js';
import ConfigigurationManager from '../Configuration/ConfigurationManager.js';

const route = Router();

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

export const redirectToMainView = async (request, response, next) => {
    response
        .status(StatusCodes.TEMPORARY_REDIRECT)
        .redirect('/products');
};

export const getHomeView = async (request, response, next) => {

    try {

        let { limit, page, sort, ...query } = request.query;

        limit = limit || 10;
        page = page || 1;

        const result = await productMan.getProducts(limit, page, sort, query);

        const products = result.docs;

        response
            .status(StatusCodes.OK)
            .render('home',
                {
                    title: 'Home',
                    activeLink: 'home',
                    section_title: "Home",
                    section_title_description: "Pagina principal",
                    isSocketView: false,
                    products: products,
                    user: request.session.user || null,
                    cartID: request.session.user.cart
                });
    }
    catch (error) {
        next(error);
    }

};

export const getRealTimeProductsView = (request, response, next) => {

    try {
        response
            .status(StatusCodes.OK)
            .render('realTimeProducts',
                {
                    title: 'Sockets',
                    activeLink: 'sockets',
                    isSocketView: true,
                    section_title: 'Sockets',
                    section_title_description: 'Vista trabajando con sockets',
                    socketScriptUrl: 'assets/js/products.realtime.js',
                    user: request.session.user || null,
                    cartID: request.session.user.cart._id
                });
    }
    catch (error) {
        next(error);
    }
};

export const getChatView = (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('chat', {
                title: 'Chat',
                activeLink: 'chat',
                isSocketView: true,
                section_title: 'Chat',
                section_title_description: 'Chatea con otros participantes!',
                socketScriptUrl: 'assets/js/chat.js',
                user: request.session.user || null,
                cartID: request.session.user.cart._id
            });
    }
    catch (error) {
        next(error);
    }
};

export const getProductsView = async (request, response, next) => {
    try {

        const categorias = ['TODAS', ... await productMan.getAllCategorys()];

        response
            .status(StatusCodes.OK)
            .render('products', {
                title: 'Productos',
                activeLink: 'products',
                isSocketView: false,
                section_title: 'Productos',
                section_title_description: 'Lista de productos',
                script: '/assets/js/products.view.js',
                user: request.session.user || null,
                categorys: categorias,
                cartID: request.session.user.cart._id
            });
    }
    catch (error) {
        next(error);
    }
};

export const getCartView = (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('cart', {
                title: 'Carrito',
                activeLink: 'carrito',
                isSocketView: false,
                section_title: 'Carrito',
                section_title_description: 'Productos en el carrito',
                script: '/assets/js/products.cart.js',
                user: request.session.user || null,
                cartID: request.session.user.cart._id
            });
    }
    catch (error) {
        next(error);
    }
};

export const getLoggerTest = (request, response, next) => {
    try {
        ConfigigurationManager.logger.fatal("mensaje Fatal");
        ConfigigurationManager.logger.error("mensaje Error");
        ConfigigurationManager.logger.warning("mensaje Warning");
        ConfigigurationManager.logger.info("mensaje Info");
        ConfigigurationManager.logger.http("mensaje Http");
        ConfigigurationManager.logger.debug("mensaje Debug");


        response
            .sendStatus(StatusCodes.OK);

    }
    catch (error) {
        next(error);
    }
};

export default route;