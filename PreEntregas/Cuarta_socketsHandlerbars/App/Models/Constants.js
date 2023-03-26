import __app_base_dirname from '../Helpers/pathUtils.js'

const PRODUCTS_FILE_PATH = './Data/Products.json';
const CARTS_FILE_PATH = './Data/Carts.json';

const EXPRESS_DEFAULT_PORT = 8080;
const EXPRESS_PRODUCTS_BASE_ROUTE = '/api/products';
const EXPRESS_CARTS_BASE_ROUTE = '/api/carts';
const EXPRESS_HANDLEBARS_BASE_ROUTE = '/';

const APP_BASE_PATH = __app_base_dirname;
const APP_VIEWS_PATH = `${APP_BASE_PATH}\\App\\Views`;
const APP_PARTIAL_VIEWS_PATH = `${APP_BASE_PATH}\\App\\Views\\partials`;
const APP_PUBLIC_PATH = `${APP_BASE_PATH}\\App\\Public`;

export {
    APP_BASE_PATH,
    APP_PUBLIC_PATH,
    APP_VIEWS_PATH,
    APP_PARTIAL_VIEWS_PATH,
    PRODUCTS_FILE_PATH,
    CARTS_FILE_PATH,
    EXPRESS_DEFAULT_PORT,
    EXPRESS_PRODUCTS_BASE_ROUTE,
    EXPRESS_CARTS_BASE_ROUTE,
    EXPRESS_HANDLEBARS_BASE_ROUTE
}