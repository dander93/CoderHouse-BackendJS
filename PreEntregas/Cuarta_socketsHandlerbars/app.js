import express from 'express';
import handlebars from 'express-handlebars'
import * as constants from './App/Models/Constants.js';
import { ProductsController, CartsController, HandlebarsController } from './App/Controllers/index.js'
import { endpointLogger, exceptionHandlerMiddleware } from './App/Middlewares/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(endpointLogger);


app.engine('handlebars', handlebars.engine())
app.set('views', constants.APP_VIEWS_PATH);
app.set('view engine', 'handlebars');
app.set(express.static(constants.APP_PUBLIC_PATH));

app.use(constants.EXPRESS_PRODUCTS_BASE_ROUTE, ProductsController);
app.use(constants.EXPRESS_CARTS_BASE_ROUTE, CartsController);
app.use(constants.EXPRESS_HANDLEBARS_BASE_ROUTE, HandlebarsController);

app.use(exceptionHandlerMiddleware);

app.listen(constants.EXPRESS_DEFAULT_PORT, () => {
    console.clear();
    console.log(`Servidor Inicializado`);
    console.log(`Servidor escuchando por default en el puerto: '${constants.EXPRESS_DEFAULT_PORT}'`);
}); 