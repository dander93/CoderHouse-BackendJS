import { Router } from 'express';
import { deleteAllCartProducts, deleteCartProduct, getCartByID, postAddProductToCart, postBuyCart, postCreateCart, updateProductByCartID, updateProductsByCartID } from '../Controllers/Cart.Controller.js';

const route = Router();

route.get('/:cid', getCartByID);
route.post('/:cid/purchase', postBuyCart);
route.post('/', postCreateCart);
route.post('/:cid/product/:pid',/* validateUserLevel(["user"]) ,*/ postAddProductToCart);
route.delete('/:cid/products/:pid', deleteCartProduct);
route.delete('/:cid', deleteAllCartProducts);
route.put('/:cid', updateProductsByCartID);
route.put('/:cid/products/:pid', updateProductByCartID);

export {
    route as default
};