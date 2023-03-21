import { BusinessException, ValidationException } from '../Exceptions/index.js';
import FileManager from './FileManager.js';
import Cart from '../Models/Cart.js';
import CartProduct from '../Models/CartProduct.js';

export default class CartManager {

    static #fileManager;
    static #carts;
    static #filePath;

    static #lastIdCart;

    constructor(jsonFilePath) {
        try {

            if (!jsonFilePath && !ProductManager.#filePath) {
                throw new ValidationException(`El path es necesario para el correcto funcionamiento del sistema`);
            }

            CartManager.#filePath = jsonFilePath;

            CartManager.#fileManager = new FileManager('utf8');

            console.info(`CartManager: Path configurado en: '${CartManager.#filePath}'`);

            if (!CartManager.#fileManager.checkFileExist(CartManager.#filePath)) {
                console.info(`CartManager: El path '${CartManager.#filePath}' no existe`);
                CartManager.#fileManager.createFile(CartManager.#filePath, []);
            }

            this.#loadCarts()
                .then(() => {
                    CartManager.#lastIdCart = CartManager.#carts[CartManager.#carts.length - 1]?.id || 0;
                });
        }
        catch (error) {
            throw error;
        }
    }

    async #loadCarts() {
        try {
            CartManager.#carts =
                JSON.parse(
                    await CartManager.#fileManager.getFileContent(CartManager.#filePath));
        }
        catch (error) {
            throw error;
        }
    }

    async createCart() {
        try {

            const cart = new Cart(CartManager.#lastIdCart + 1);

            CartManager.#lastIdCart = cart.id;

            CartManager.#carts.push(cart);

            await CartManager.#fileManager.saveToFile(CartManager.#carts, CartManager.#filePath)

            return cart.id;
        }
        catch (error) {
            throw error;
        }
    }


    async getCartProducts(id) {
        try {
            if (!id && id !== 0) {
                throw new ValidationException("El id no puede estar vacío");
            }

            await this.#loadCarts();

            const found = CartManager.#carts.find(elem => elem.id === id);

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

            if (!cartID && cartID !== 0) {
                throw new ValidationException("El id del carrito no puede estar vacío");
            }

            if (!productID && productID !== 0) {
                throw new ValidationException("El id del producto no puede estar vacío");
            }

            await this.#loadCarts();
            const cartIDFound = CartManager.#carts.findIndex(elem => elem.id === cartID);


            if (!cartIDFound && cartIDFound !== 0) {
                throw new BusinessException("Carrito no encontrado", "CRTNTFND", 404);
            }

            const productFound = CartManager.#carts[cartIDFound].products.find(elem => elem.idProducto === productID);

            if (productFound) {
                CartManager.#carts[cartIDFound].products =
                    CartManager.#carts[cartIDFound].products.map(
                        prod => {
                            if (prod.idProducto === productID) {
                                prod.quantity = prod.quantity + 1;
                            }
                            return prod;
                        });
            }
            else {
                CartManager.#carts[cartIDFound].products.push(new CartProduct(productID, 1));
            }

            await CartManager.#fileManager.saveToFile(CartManager.#carts, CartManager.#filePath);

            return `Producto agregado con exito`;
        }
        catch (error) {
            throw error;
        }
    }

}