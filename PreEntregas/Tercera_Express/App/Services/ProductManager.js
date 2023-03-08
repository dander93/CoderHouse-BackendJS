import { BusinessException, ExceptionHandler, ValidationException } from "../Exceptions/index.js"
import Product from "../Models/Product.js";
import FileManager from "./FileManager.js"

export default class ProductManager {

    static #fileManager;
    static #products = [];
    static #path;

    constructor(path) {
        try {

            if (!path && !ProductManager.#path) {
                throw new ValidationException(`El path es necesario para el correcto funcionamiento del sistema`);
            }

            ProductManager.#path = path;

            console.info(`ProductManager: Path configurado en: '${ProductManager.#path}'`);

            ProductManager.#fileManager = new FileManager('utf8');

            if (!ProductManager.#fileManager.checkFileExist(ProductManager.#path)) {
                console.info(`El path '${ProductManager.#path}' no existe`);
                ProductManager.#fileManager.createFile(ProductManager.#path, []);
            }

        }
        catch (error) {
            ExceptionHandler.handle(error);
        }
    }

    async #loadProducts() {
        try {
            ProductManager.#products = 
                JSON.parse(
                    await ProductManager.#fileManager.getFileContent(ProductManager.#path));
        }
        catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        try {
            if (product instanceof Product && product.isValidProduct()) {

                await this.#loadProducts();

                if (!ProductManager.#products.find(elem => elem.code === product.code)) {
                    ProductManager.#products.push(product);

                    await ProductManager.#fileManager.saveToFile(ProductManager.#products, ProductManager.#path)
                    return product.code;
                }

                throw new BusinessException(`El producto id: '${product.code}' ya existía previamente`);
            }

            throw new BusinessException(`El producto id:'${product.code}' ingresado no es válido`);
        } catch (error) {
            return ExceptionHandler.handle(error);
        }
    }

    async getProducts() {
        try {
            await this.#loadProducts();

            return ProductManager.#products;
        }
        catch (error) {
            return ExceptionHandler.handle(error);
        }
    }

    async getProductByCode(code) {
        try {
            if (!code) {
                throw new BusinessException("El código no puede estar vacío");
            }

            await this.#loadProducts();

            const found = ProductManager.#products.find(elem => elem.code === code);

            if (!found) {
                throw new BusinessException("Elemento no encontrado");
            }

            return found;

        } catch (error) {
            return ExceptionHandler.handle(error);
        }
    }

    async getProductByID(id) {
        try {
            if (!id) {
                throw new BusinessException("El id no puede estar vacío");
            }

            await this.#loadProducts();

            const found = ProductManager.#products.find(elem => elem.id === id);

            if (!found) {
                throw new BusinessException("Elemento no encontrado");
            }

            return found;
        }
        catch (error) {
            return ExceptionHandler.handle(error);
        }
    }

    async #getProductIndexByID(id) {
        try {
            await this.#loadProducts();

            const found = ProductManager.#products.findIndex(elem => elem.id === id);

            if (found === -1) {
                throw new BusinessException("Elemento no encontrado");
            }

            return found;
        }
        catch (error) {
            throw new BusinessException("Elemento no encontrado");
        }
    }

    async updateProduct(id, campoActualizar, valorActualizar) {
        try {
            if (!id) {
                throw new BusinessException("El id no puede estar vacío");
            }

            if (!campoActualizar || !valorActualizar) {
                throw new BusinessException("Los campos campoActualizar y valorActualizar son obligatorios");
            }

            if (campoActualizar === 'id') {
                throw new BusinessException("El campo id es de uso interno y no debe modificarse ni eliminarse");
            }

            const index = await this.#getProductIndexByID(id);

            if (index > -1) {

                const newProductList = ProductManager.#products.map(product => {

                    if (product.id === id) {
                        product[campoActualizar] = valorActualizar
                    }

                    return product;
                });

                ProductManager.#fileManager.saveToFile(newProductList, ProductManager.#path);

                console.info(`ProductManager: Elemento con id '${id}' actualizado, campo '${campoActualizar}' seteado a '${valorActualizar}' correctamente`);
                return id;
            }

            throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`);
        }
        catch (error) {
            return ExceptionHandler.handle(error);
        }
    }

    async deleteProduct(id) {
        try {
            if (!id) {
                throw new BusinessException("El id no puede estar vacío");
            }

            const index = await this.#getProductIndexByID(id);

            if (index > -1) {

                const newProductList = [...ProductManager.#products].filter(product => product.id != id);

                ProductManager.#fileManager.saveToFile(newProductList, ProductManager.#path);

                console.info(`ProductManager: Elemento con id ${id} borrado`);
                return id;
            }

            throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`);
        }
        catch (error) {
            return ExceptionHandler.handle(error);
        }
    }
}