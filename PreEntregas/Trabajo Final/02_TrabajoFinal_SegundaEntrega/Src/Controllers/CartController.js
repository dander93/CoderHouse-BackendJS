import { Router, json } from 'express';
import ValidationException from '../Models/Exceptions/ValidationException.js';
import { CARTS_FILE_PATH, PRODUCTS_FILE_PATH } from '../Models/Constants/Constants.js';
import CartManager from '../Services/CartManager.js';
import ProductManager from '../Services/ProductManager.js';
import StatusCodes from 'http-status-codes';
import BusinessException from '../Models/Exceptions/BusinessException.js';

const route = Router();
const cartManager = new CartManager(CARTS_FILE_PATH);
const productManager = new ProductManager(PRODUCTS_FILE_PATH);

/*
Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products.
Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. 
De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
*/

route.get('/:cid', async (request, response, next) => {

    try {

        const { cid } = request.params;

        if (!cid) {
            throw new ValidationException("El valor solicitado debe no debe ser null");
        }

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await cartManager.getCartProducts(cid));
    }
    catch (error) {

        if (error.name === 'CastError') {
            return next(new BusinessException("Carrito no valido", "ERCAR400", 400));
        }

        next(error);
    }
});

route.post('/', async (request, response, next) => {
    try {
        response
            .status(StatusCodes.CREATED)
            .type('json')
            .send({ 'message': `Carrito creado id: ${await cartManager.createCart()}` });
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
            .status(StatusCodes.OK)
            .type('json')
            .send(
                { 'message': `${await cartManager.addProductToCart(cid, pid)}` });
    }
    catch (error) {
        next(error);
    }
});

route.delete('/:cid/products/:pid', async (request, response, next) => {
    try {
        const { cid, pid } = request.params;

        if (!cid) {
            throw new ValidationException("El valor del carrito solicitado debe no debe ser null");
        }

        if (!pid) {
            throw new ValidationException("El valor del producto solicitado debe no debe ser null");
        }

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await cartManager.deleteCartProduct(cid, pid));
    }
    catch (error) {
        next(error);
    }
});

route.delete('/:cid', async (request, response, next) => {
    try {
        const { cid } = request.params;

        if (!cid) {
            throw new ValidationException("El valor del carrito solicitado debe no debe ser null");
        }

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await cartManager.deleteAllCartProducts(cid));
    }
    catch (error) {
        next(error);
    }
});

route.put('/:cid', async (request, response, next) => {
    try {
        const { cid } = request.params;

        if (!cid) {
            throw new ValidationException("El valor del carrito solicitado debe no debe ser null");
        }

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await cartManager.updateProductsByCartID(cid, request.body));

    }
    catch (error) {
        next(error);
    }
});

route.put('/:cid/products/:pid', async (request, response, next) => {
    try {
        const { cid, pid } = request.params;
        const { quantity } = request.body;

        if (!cid) {
            throw new ValidationException("El valor del carrito solicitado debe no debe ser null");
        }

        if (!pid) {
            throw new ValidationException("El valor del producto solicitado debe no debe ser null");
        }

        if (isNaN(quantity)) {
            throw new ValidationException("La cantidad a modificar no es válida");
        }

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await cartManager.updateProductByCartID(cid, pid, quantity));
    }
    catch (error) {
        next(error);
    }
});

export default route;