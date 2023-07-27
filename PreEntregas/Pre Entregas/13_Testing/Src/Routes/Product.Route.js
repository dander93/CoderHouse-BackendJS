import { Router } from "express";
import { deleteProductByID, getMockedProducts, getProductByID, getProducts, postCreateProduct, putUpdateProductByID } from "../Controllers/Product.Controller.js";

const route = Router();

route.get('/', getProducts);
route.get('/mockingproducts', getMockedProducts);
route.get('/:pid', getProductByID);
route.post('/', /* validateUserLevel(["admin"]) ,*/ postCreateProduct);
route.put('/:pid', /* validateUserLevel(["admin"]) ,*/ putUpdateProductByID);
route.delete('/:pid', /* validateUserLevel(["admin"]) ,*/ deleteProductByID);

export {
    route as default
};