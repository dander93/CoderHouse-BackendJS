import { Router } from 'express'
import { PRODUCTS_FILE_PATH } from '../Models/Constants.js';
import ProductManager from '../Services/ProductManager.js';

const route = Router();

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

route.get('/', async (request, response, next) => {

    try {
        response.render('home', {
            tittle: 'Home',
            section_title: "Home",
            section_title_description: "Pagina principal",
            products: await productMan.getProducts()
        });
    }
    catch (error) {
        next(error);
    }

});


export default route;