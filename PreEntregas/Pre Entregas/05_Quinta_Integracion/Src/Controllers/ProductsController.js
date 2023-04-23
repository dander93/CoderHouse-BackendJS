import { Router } from 'express';
import ProductManager from '../Services/ProductManager.js'
import { PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js'
import ValidationException from '../Models/Exceptions/ValidationException.js';
import Product from '../Models/Product.js';

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

const route = Router();

route.get('/', async (request, response, next) => {
    try {

        const { limit } = request.query;

        if (limit && isNaN(limit)) {
            throw new ValidationException("El valor limitante debe ser numérico");
        }

        const products = await productMan.getProducts();

        response
            .status(200)
            .type('json')
            .send(limit ? products.splice(0, Number.parseInt(limit)) : products);
    }
    catch (error) {
        next(error);
    }
});

route.get('/:pid', async (request, response, next) => {
    try {

        if (!request.params.pid) {
            throw new ValidationException("El valor ingresado no puede ser null");
        }

        response
            .status(200)
            .type('json')
            .send(
                await productMan.getProductByID(request.params.pid));
    }
    catch (error) {
        next(error);
    }
});

route.post('/', async (request, response, next) => {

    try {

        const { title, description, price, thumbnails, stock, code, status, category } = request.body;

        response
            .status(201)
            .type('json')
            .send(
                await productMan.addProduct(
                    new Product(title, description, price, thumbnails, stock, code, category, status)));
    }
    catch (error) {
        next(error);
    }
});

route.put('/:pid', async (request, response, next) => {
    try {
        if (!request.params.pid) {
            throw new ValidationException("El valor ingresado no puede ser null");
        }

        const { title, description, price, thumbnails, stock, code, category, status } = request.body;

        response
            .status(200)
            .type('json')
            .send(
                await productMan.updateProduct(
                    request.params.pid,
                    new Product(title, description, price, thumbnails, stock, code, category, status)));
    }
    catch (error) {
        next(error)
    }
    /*
    La ruta PUT /:pid deberá tomar un producto y actualizarlo por los campos enviados desde body. NUNCA se debe actualizar o eliminar el id al momento de hacer dicha actualización.
    */
});


route.delete('/:pid', async (request, response, next) => {
    try {
        
        if (!request.params.pid) {
            throw new ValidationException("El valor ingresado no puede ser null");
        }

        response
            .status(200)
            .type('json')
            .send(
                await productMan.deleteProduct(request.params.pid));

    }
    catch (error) {
        next(error)
    }
});

export default route;