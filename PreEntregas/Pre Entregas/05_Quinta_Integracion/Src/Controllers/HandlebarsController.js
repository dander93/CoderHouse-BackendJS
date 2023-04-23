import { Router } from 'express'
import { PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js';
import ProductManager from '../Services/ProductManager.js';

const route = Router();

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

route.get('/', async (request, response, next) => {

    try {
        response
            .status(200)
            .render('home',
                {
                    title: 'Home',
                    activeLink: 'home',
                    section_title: "Home",
                    section_title_description: "Pagina principal",
                    isSocketView: false,
                    products: await productMan.getProducts()
                });
    }
    catch (error) {
        next(error);
    }

});

route.get('/realtimeproducts', (request, response, next) => {

    try {
        response
            .status(200)
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
            .status(200)
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

export default route;