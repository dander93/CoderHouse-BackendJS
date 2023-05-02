import { BusinessException, ValidationException } from '../Models/Exceptions/index.js';
import DataAccessService from './DataAccessService.js';
import { cartSchema, productSchema } from '../Models/Schemes/index.js';

export default class CartManager {

    static #cartsRepository;
    static #productsRepository;

    constructor() {
        try {

            if (!CartManager.#cartsRepository) {
                const data = new DataAccessService();
                CartManager.#cartsRepository =
                    data.getRepository("carts", cartSchema);

                CartManager.#productsRepository =
                    data.getRepository("products", productSchema);

                console.info("CartManager: Configurando repositorio de carritos");
            }
        }
        catch (error) {
            throw error;
        }
    }

    async createCart() {
        try {
            const cart = await CartManager.#cartsRepository.create({});

            return cart._id;
        }
        catch (error) {
            throw error;
        }
    }

    async getCartProducts(id) {
        try {
            if (!id) {
                throw new ValidationException("El id no puede estar vacío");
            }

            const found =
                await CartManager.#cartsRepository.findById(id);

            if (!found) {
                throw new BusinessException("Cart no encontrado", "CRTNTFND", 404);
            }

            return found.products;
        }
        catch (error) {
            throw error;
        }
    }

    async addProductToCart(cartID, productID) {
        try {

            if (!cartID) {
                throw new ValidationException("El id del carrito no puede estar vacío");
            }

            if (!productID) {
                throw new ValidationException("El id del producto no puede estar vacío");
            }


            const count = await CartManager.#cartsRepository.countDocuments({ _id: cartID, "products.productID": productID });

            if (!count) {
                await CartManager.#cartsRepository.findByIdAndUpdate(cartID,
                    { $push: { products: { quantity: 1, productID: productID } } }
                );
            }
            else {
                await CartManager.#cartsRepository.updateOne(
                    { _id: cartID, "products.productID": productID },
                    {
                        $inc: { "products.$.quantity": 1 }
                    });
            }

            return `Producto id: '${productID}' agregado al carrito '${cartID}'`;
        }
        catch (error) {
            throw error;
        }
    }

    async deleteAllCartProducts(cartID) {
        try {


            const prevStatus = await CartManager.#cartsRepository.findByIdAndUpdate(cartID, {
                $set: { "products": [] }
            });

            return prevStatus;
        }
        catch (error) {
            throw error;
        }
    }

    async deleteCartProduct(cartID, productID) {
        try {
            const prevStatus = await CartManager.#cartsRepository.findByIdAndUpdate(cartID,
                {
                    $pull: { products: { productID: productID } }
                });

            return prevStatus;
        }
        catch (error) {
            throw error;
        }
    }

    async updateProductsByCartID(cartID, products) {
        try {

            const productIDs = products.map(product => product.productID);

            const foundIDS = await CartManager.#productsRepository.countDocuments({ _id: { $in: productIDs } });

            if (productIDs.length !== foundIDS) {
                throw new ValidationException("No todos los productos proporcionados son válidos. Transacción inválida");
            }

            const prevStatus = await CartManager.#cartsRepository.findByIdAndUpdate(cartID,
                {
                    $set: { products: products }
                });

            return prevStatus;
        }
        catch (error) {
            throw error;
        }
    }

    async updateProductByCartID(cartID, productID, cantidad) {
        try {

            await CartManager.#cartsRepository.updateOne(
                { _id: cartID, "products.productID": productID },
                {
                    $set: { "products.$.quantity": cantidad }
                });

            const cart = await this.getCartProducts(cartID);

            return cart.filter(product => product.productID._id.equals(productID));
        }
        catch (error) {
            throw error;
        }
    }
}