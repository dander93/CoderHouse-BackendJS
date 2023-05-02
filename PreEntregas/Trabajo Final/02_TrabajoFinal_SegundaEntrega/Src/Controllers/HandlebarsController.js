import { Router } from 'express';
import { PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js';
import ProductManager from '../Services/ProductManager.js';
import StatusCodes from 'http-status-codes';
import endpointAuthRequired from '../Middlewares/EndpointRequireAuth.js';

const route = Router();

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

route.get('/', endpointAuthRequired, async (request, response, next) => {
    response
        .status(StatusCodes.TEMPORARY_REDIRECT)
        .redirect('/products');
});

route.get('/home', endpointAuthRequired, async (request, response, next) => {

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
                    user: request.session.user || null
                });
    }
    catch (error) {
        next(error);
    }

});

route.get('/realtimeproducts', endpointAuthRequired, (request, response, next) => {

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
                    user: request.session.user || null
                });
    }
    catch (error) {
        next(error);
    }
});

route.get('/chat', endpointAuthRequired, (request, response, next) => {
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
                user: request.session.user || null
            });
    }
    catch (error) {
        next(error);
    }
});

route.get('/products', endpointAuthRequired, async (request, response, next) => {
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
                categorys: categorias
            });
    }
    catch (error) {
        next(error);
    }
});

route.get('/carts/:cid', endpointAuthRequired, (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('cart', {
                title: 'Carrito',
                activeLink: null,
                isSocketView: false,
                section_title: 'Carrito',
                section_title_description: 'Productos en el carrito',
                script: '/assets/js/products.cart.js',
                user: request.session.user || null
            });
    }
    catch (error) {
        next(error);
    }
});

export default route;