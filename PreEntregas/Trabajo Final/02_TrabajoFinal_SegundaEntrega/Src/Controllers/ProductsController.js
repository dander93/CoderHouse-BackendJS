import { Router } from 'express';
import ProductManager from '../Services/ProductManager.js'
import ValidationException from '../Models/Exceptions/ValidationException.js';
import Product from '../Models/Product.js';
import ResponseBuilder from '../Services/ResponseBuilder.js';
import ResponseTypes from '../Models/Enums/ResponseTypeEnum.js'
import StatusCodes from 'http-status-codes'

const productMan = new ProductManager();

const route = Router();

const allowedSortValues = ["asc", "desc"];

route.get('/', async (request, response, next) => {
    try {

        let { limit, page, sort, ...query } = request.query;

        limit = limit || 10;
        page = page || 1;

        if (limit && isNaN(limit)) {
            throw new ValidationException("El valor limitante debe ser numérico");
        }

        if (page && isNaN(page)) {
            throw new ValidationException("El valor de la pagina solicitada debe ser numérico");
        }

        if (sort && !allowedSortValues.includes(sort.toLocaleLowerCase())) {
            throw new ValidationException("los únicos valores posibles para sort son 'asc' y desc'");
        }

        const productsResult = await productMan.getProducts(limit, page, sort, query);

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                new ResponseBuilder(ResponseTypes.GetProducts, request)
                    .buildResponse({ status: productsResult.docs.length ? 'success' : 'error', ...productsResult }));
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
            .status(StatusCodes.OK)
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
            .status(StatusCodes.CREATED)
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
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await productMan.updateProduct(
                    request.params.pid,
                    new Product(title, description, price, thumbnails, stock, code, category, status)));
    }
    catch (error) {
        next(error)
    }
});

route.delete('/:pid', async (request, response, next) => {
    try {

        if (!request.params.pid) {
            throw new ValidationException("El valor ingresado no puede ser null");
        }

        response
            .status(StatusCodes.OK)
            .type('json')
            .send(
                await productMan.deleteProduct(request.params.pid));

    }
    catch (error) {
        next(error)
    }
});

export default route;