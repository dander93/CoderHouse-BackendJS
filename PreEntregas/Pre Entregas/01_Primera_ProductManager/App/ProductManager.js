import Product from "./Models/Product.js";
import { BusinessException, ExceptionHandler } from "./Exceptions/index.js"

export default class ProductManager {

    static #products = [];

    exceptionHandler;

    addProduct(product) {
        try {
            if (product instanceof Product && product.isValidProduct()) {

                if (!ProductManager.#products.find(elem => elem.code === product.code)) {
                    ProductManager.#products.push(product);
                    return product.code;
                }

                throw new BusinessException(`El producto id: '${product.code}' ya existía previamente`);
            }

            throw new BusinessException(`El producto id:'${product.code}' ingresado no es válido`);
        } catch (error) {
            ExceptionHandler.handle(error);
        }
    }

    getProducts = () => ProductManager.#products;

    getProductById(code) {
        try {
            if (!code) {
                throw new BusinessException("El id no puede estar vacío");
            }
            console.log(ProductManager.#products)

            const found = ProductManager.#products.find(elem => elem.code === code);

            if (!found) {
                throw new BusinessException("Elemento no encontrado");
            }

            return found;

        } catch (error) {
            ExceptionHandler.handle(error);
        }
    }
}