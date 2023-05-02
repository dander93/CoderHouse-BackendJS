import __app_base_dirname from '../../Helpers/pathUtils.js'

const PRODUCTS_FILE_PATH = './Data/Products.json';
const CARTS_FILE_PATH = './Data/Carts.json';

const APP_BASE_PATH = __app_base_dirname;
const APP_VIEWS_PATH = `${APP_BASE_PATH}\\Src\\Views`;
const APP_PARTIAL_VIEWS_PATH = `${APP_BASE_PATH}\\Src\\Views\\partials`;
const APP_PUBLIC_PATH = `${APP_BASE_PATH}\\Src\\Public`;


export {
    APP_BASE_PATH,
    APP_PUBLIC_PATH,
    APP_VIEWS_PATH,
    APP_PARTIAL_VIEWS_PATH,
    PRODUCTS_FILE_PATH,
    CARTS_FILE_PATH
}