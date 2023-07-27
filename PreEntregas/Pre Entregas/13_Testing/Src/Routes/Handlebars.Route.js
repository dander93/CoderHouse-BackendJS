import { Router } from 'express';
import { getCartView, getChatView, getHomeView, getLoggerTest, getProductsView, getRealTimeProductsView, redirectToMainView } from '../Controllers/Handlebars.Controller.js';
import { endpointAuthRequired } from '../Middlewares/index.js';

const route = Router();

route.get('/', endpointAuthRequired, redirectToMainView);
route.get('/home', endpointAuthRequired, getHomeView);
route.get('/realtimeproducts', endpointAuthRequired, getRealTimeProductsView);
route.get('/chat', /*validateUserLevel(["user"]) ,*/ endpointAuthRequired, getChatView);
route.get('/products', endpointAuthRequired, getProductsView);
route.get('/carts/:cid', endpointAuthRequired, getCartView);
route.get('/loggerTest', getLoggerTest);

export {
    route as default
};