import { Router } from 'express'
import { PRODUCTS_FILE_PATH } from '../Models/Constants.js';
import ProductManager from '../Services/ProductManager.js';

const route = Router();

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

route.get('/', async (request, response, next) => {

    try {
        response
            .status(200)
            .render('home',
                {
                    tittle: 'Home',
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
                    tittle: 'Sockets',
                    activeLink: 'sockets',
                    // section_title: 'Sockets',
                    // section_title_description: 'Vista trabajando con sockets'
                    isSocketView: true,
                    socketScriptUrl: 'assets/js/realTimeProducts.js'
                })
    }
    catch (error) {
        next(error)
    }
})


export default route;