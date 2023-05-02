import { Router } from 'express';
import { PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js';
import ProductManager from '../Services/ProductManager.js';
import StatusCodes from 'http-status-codes';

const route = Router();

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

route.get('/', async (request, response, next) => {
    response
        .status(StatusCodes.TEMPORARY_REDIRECT)
        .redirect('/login');
});

route.get('/home', async (request, response, next) => {

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
                    products: products
                });
    }
    catch (error) {
        next(error);
    }

});

route.get('/realtimeproducts', (request, response, next) => {

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
                    socketScriptUrl: 'assets/js/realTimeProducts.js'
                });
    }
    catch (error) {
        next(error);
    }
});

route.get('/chat', (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('chat', {
                title: 'Chat',
                activeLink: 'chat',
                isSocketView: true,
                section_title: 'Chat',
                section_title_description: 'Chatea con otros participantes!',
                socketScriptUrl: 'assets/js/chat.js'
            });
    }
    catch (error) {
        next(error);
    }
});

route.get('/products', (request, response, next) => {
    try {

        console.log(request.session);
        response
            .status(StatusCodes.OK)
            .render('products', {
                title: 'Productos',
                activeLink: 'products',
                isSocketView: false,
                section_title: 'Productos',
                section_title_description: 'Lista de productos',
                script: '/assets/js/products.view.js'
            });
    }
    catch (error) {
        next(error);
    }
});

route.get('/carts/:cid', (request, response, next) => {
    try {
        response
            .status(StatusCodes.OK)
            .render('cart', {
                title: 'Carrito',
                activeLink: null,
                isSocketView: false,
                section_title: 'Carrito',
                section_title_description: 'Productos en el carrito',
                script: '/assets/js/products.cart.js'
            });
    }
    catch (error) {
        next(error);
    }
});

export default route;