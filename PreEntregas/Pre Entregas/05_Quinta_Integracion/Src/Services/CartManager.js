import { BusinessException, ValidationException } from '../Models/Exceptions/index.js';
// import FileManager from './FileManager.js';
// import Cart from '../Models/Cart.js';
import CartProduct from '../Models/CartProduct.js';
import DataAccessService from './DataAccessService.js';
import { cartSchema, productSchema } from '../Models/Schemes/index.js';
import MONGOOSE_CONFIGURATION from '../Models/Constants/MongooseConfigurationConstants.js'

export default class CartManager {

    // static #fileManager;
    // static #carts;
    // static #filePath;

    // static #lastIdCart;

    static #cartsRepository;

    constructor() {
        try {

            if (!CartManager.#cartsRepository) {
                const data = new DataAccessService();
                CartManager.#cartsRepository =
                    data.getRepository(MONGOOSE_CONFIGURATION.collections.carts, cartSchema);

                console.info("CartManager: Configurando repositorio de carritos");
            }
        }
        catch (error) {
            throw error;
        }
    }

    // constructor(jsonFilePath) {
    //     try {

    //         if (!jsonFilePath && !ProductManager.#filePath) {
    //             throw new ValidationException(`El path es necesario para el correcto funcionamiento del sistema`);
    //         }

    //         CartManager.#filePath = jsonFilePath;

    //         CartManager.#fileManager = new FileManager('utf8');

    //         console.info(`CartManager: Path configurado en: '${CartManager.#filePath}'`);

    //         if (!CartManager.#fileManager.checkFileExist(CartManager.#filePath)) {
    //             console.info(`CartManager: El path '${CartManager.#filePath}' no existe`);
    //             CartManager.#fileManager.createFile(CartManager.#filePath, []);
    //         }

    //         this.#loadCarts()
    //             .then(() => {
    //                 CartManager.#lastIdCart = CartManager.#carts[CartManager.#carts.length - 1]?.id || 0;
    //             });
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

    // async #loadCarts() {
    //     try {
    //         CartManager.#carts =
    //             JSON.parse(
    //                 await CartManager.#fileManager.getFileContent(CartManager.#filePath));
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

    async createCart() {
        try {

            // const cart = new Cart(CartManager.#lastIdCart + 1);

            // CartManager.#lastIdCart = cart.id;

            // CartManager.#carts.push(cart);

            // await CartManager.#fileManager.saveToFile(CartManager.#carts, CartManager.#filePath)

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

            // await this.#loadCarts();

            // const found = CartManager.#carts.find(elem => elem.id === id);

            const found = await CartManager.#cartsRepository.findById(id);

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

            // await this.#loadCarts();
            // const cartIDFound = CartManager.#carts.findIndex(elem => elem.id === cartID);

            const cart = await CartManager.#cartsRepository.findById(cartID);

            if (!cart) {
                throw new BusinessException("Carrito no encontrado", "CRTNTFND", 404);
            }

            // const productFound = CartManager.#carts[cartIDFound].products.find(elem => elem.idProducto === productID);
            const isProductInCart = cart.products.find(product => product.productID === productID);

            if (isProductInCart) {
                const products = cart.products.map(
                    product => {

                        if (product.productID === productID) {
                            product.quantity = product.quantity + 1;
                        }

                        return product;
                    })

                cart.products = products;
            }
            else {
                cart.products.push({
                    quantity: 1,
                    productID: productID
                });
            }

            await CartManager.#cartsRepository.findByIdAndUpdate(cartID, cart);
            // if (productFound) {
            //     CartManager.#carts[cartIDFound].products =
            //         CartManager.#carts[cartIDFound].products.map(
            //             prod => {
            //                 if (prod.idProducto === productID) {
            //                     prod.quantity = prod.quantity + 1;
            //                 }
            //                 return prod;
            //             });
            // }
            // else {
            //     CartManager.#carts[cartIDFound].products.push(new CartProduct(productID, 1));
            // }

            // await CartManager.#fileManager.saveToFile(CartManager.#carts, CartManager.#filePath);

            return `Producto id: '${productID}' agregado al carrito '${cartID}'`;
        }
        catch (error) {
            throw error;
        }
    }

}