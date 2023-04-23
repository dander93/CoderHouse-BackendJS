import { Router } from 'express';
import ValidationException from '../Models/Exceptions/ValidationException.js';
import { CARTS_FILE_PATH, PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js';
import CartManager from '../Services/CartManager.js';
import ProductManager from '../Services/ProductManager.js';

const route = Router();
const cartManager = new CartManager(CARTS_FILE_PATH);
const productManager = new ProductManager(PRODUCTS_FILE_PATH);

route.post('/', async (request, response, next) => {
    try {
        response
            .status(201)
            .type('json')
            .send({ 'message': `Carrito creado id: ${await cartManager.createCart()}` });
    }
    catch (error) {
        next(error);
    }
});

route.get('/:cid', async (request, response, next) => {

    try {

        const { cid } = request.params;

        if (!cid) {
            throw new ValidationException("El valor solicitado debe no debe ser null");
        }

        response
            .status(200)
            .type('json')
            .send(
                await cartManager.getCartProducts(cid));
    }
    catch (error) {
        next(error);
    }
});

route.post('/:cid/product/:pid', async (request, response, next) => {
    try {
        const { cid, pid } = request.params;

        if (!cid) {
            throw new ValidationException("El id del carrito proporcionado no puede ser null");
        }

        if (!pid) {
            throw new ValidationException("El valor del producto proporcionado no puede ser null");
        }

        //si no lo encuentra throwea
        await productManager.getProductByID(pid);

        response
            .status(200)
            .type('json')
            .send(
                { 'message': `${await cartManager.addProductToCart(cid, pid)}` });
    }
    catch (error) {
        next(error);
    }
});

export default route;