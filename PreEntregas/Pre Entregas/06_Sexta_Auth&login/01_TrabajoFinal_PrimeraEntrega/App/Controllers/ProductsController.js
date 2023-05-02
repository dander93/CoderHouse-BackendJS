import { Router } from 'express';
import ProductManager from '../Services/ProductManager.js'
import { PRODUCTS_FILE_PATH } from '../Models/Constants.js'
import ValidationException from '../Exceptions/ValidationException.js';
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

        if (isNaN(request.params.pid) || Number.parseInt(request.params.pid) < 0) {
            throw new ValidationException("El valor solicitado debe ser un valor numérico positivo");
        }

        response
            .status(200)
            .type('json')
            .send(
                await productMan.getProductByID(
                    Number.parseInt(request.params.pid)));
    }
    catch (error) {
        next(error);
    }
});

route.post('/', async (request, response, next) => {

    try {

        const { title, description, price, thumbnails, stock, code, status } = request.body;

        response
            .status(201)
            .type('json')
            .send(
                await productMan.addProduct(
                    new Product(title, description, price, thumbnails, stock, code, status)));
    }
    catch (error) {
        next(error);
    }
});

route.put('/:pid', async (request, response, next) => {
    try {
        if (isNaN(request.params.pid) || Number.parseInt(request.params.pid) < 0) {
            throw new ValidationException("El valor solicitado debe ser un valor numérico positivo");
        }

        const { title, description, price, thumbnails, stock, code, status } = request.body;

        response
            .status(200)
            .type('json')
            .send(
                await productMan.updateProduct(
                    Number.parseInt(request.params.pid),
                    new Product(title, description, price, thumbnails, stock, code, status)));
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
        if (isNaN(request.params.pid) || Number.parseInt(request.params.pid) < 0) {
            throw new ValidationException("El valor solicitado debe ser un valor numérico positivo");
        }

        response
            .status(200)
            .type('json')
            .send(
                await productMan.deleteProduct(
                    Number.parseInt(request.params.pid)));

    }
    catch (error) {
        next(error)
    }
});

export default route;