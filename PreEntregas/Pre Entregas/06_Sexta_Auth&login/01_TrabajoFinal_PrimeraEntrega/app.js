import express from 'express';
import * as Application from './App/Models/Constants.js';
import { ProductsController, CartsController } from './App/Controllers/index.js'
import { endpointLogger, exceptionHandlerMiddleware } from './App/Middlewares/index.js';

const app = express();

app.use(express.json());
app.use(endpointLogger);

app.use(Application.EXPRESS_PRODUCTS_BASE_ROUTE, ProductsController);
app.use(Application.EXPRESS_CARTS_BASE_ROUTE, CartsController);

app.use(exceptionHandlerMiddleware);

app.listen(Application.EXPRESS_DEFAULT_PORT, () => {
    console.clear();
    console.log(`Servidor Inicializado`);
    console.log(`Servidor escuchando por default en el puerto ${Application.EXPRESS_DEFAULT_PORT}`);
});