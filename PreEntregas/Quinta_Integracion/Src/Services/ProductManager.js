import { BusinessException, ValidationException } from "../Models/Exceptions/index.js"
import Product from "../Models/Product.js";
// import FileManager from "./FileManager.js"
import DataAccessService from './DataAccessService.js'
import { productSchema } from '../Models/Schemes/index.js';
import MONGOOSE_CONFIGURATION from '../Models/Constants/MongooseConfigurationConstants.js';

export default class ProductManager {

    // static #fileManager;
    // static #products = [];
    // static #path;

    // static #lastIdProduct;

    static #repository;

    constructor() {
        try {

            if (!ProductManager.#repository) {
                ProductManager.#repository =
                    new DataAccessService()
                        .getRepository(MONGOOSE_CONFIGURATION.collections.products, productSchema);
                console.info("ProductManager: Configurando repositorio");
            }
        }
        catch (error) {
            throw error;
        }
    }

    // constructor(path) {
    //     try {

    //         if (!path && !ProductManager.#path) {
    //             throw new ValidationException(`El path es necesario para el correcto funcionamiento del sistema`);
    //         }



    //         ProductManager.#path = path;

    //         console.info(`ProductManager: Path configurado en: '${ProductManager.#path}'`);

    //         ProductManager.#fileManager = new FileManager('utf8');

    //         if (!ProductManager.#fileManager.checkFileExist(ProductManager.#path)) {
    //             console.info(`ProductManager: El path '${ProductManager.#path}' no existe`);
    //             ProductManager.#fileManager.createFile(ProductManager.#path, []);
    //         }

    //         this.#loadProducts()
    //             .then(() => {
    //                 ProductManager.#lastIdProduct = ProductManager.#products[ProductManager.#products.length - 1]?.id || 0;
    //                 // console.log(ProductManager.#products[ProductManager.#products.length - 1])
    //             });

    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

    // async #loadProducts() {
    //     try {
    //         ProductManager.#products =
    //             JSON.parse(
    //                 await ProductManager.#fileManager.getFileContent(ProductManager.#path));
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

    async addProduct(product) {
        try {

            // await this.#loadProducts();

            // if (!ProductManager.#products.find(elem => elem.code === product.code)) {

            //     product.id = ProductManager.#lastIdProduct + 1;

            //     ProductManager.#products.push(product);

            //     await ProductManager.#fileManager.saveToFile(ProductManager.#products, ProductManager.#path)

            //     ProductManager.#lastIdProduct = product.id;

            //     return product.code;
            // }

            if (product instanceof Product && product.isValidProduct()) {

                return await ProductManager.#repository.create({
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    thumbnails: product.thumbnails,
                    stock: product.stock,
                    code: product.code,
                    category: product.category,
                    status: product.status
                });
            }

            throw new BusinessException(`El producto id:'${product.code}' ingresado no es válido`, "ERRPRODINV", 400);
        }
        catch (error) {
            throw error;
        }
    }

    async getProducts() {
        try {
            // await this.#loadProducts();

            // return ProductManager.#products;

            return await ProductManager.#repository.find().lean();
        }
        catch (error) {
            throw error;
        }
    }

    async getProductByCode(code) {
        try {
            if (!code) {
                throw new BusinessException("El código no puede estar vacío");
            }

            return await ProductManager.#repository.find({
                'code': code
            });

            // await this.#loadProducts();

            // const found = ProductManager.#products.find(elem => elem.code === code);

            // if (!found) {
            //     throw new BusinessException("Elemento no encontrado");
            // }

            // return found;



        }
        catch (error) {
            throw error;
        }
    }

    async getProductByID(id) {
        try {
            
            if (!id) {
                throw new ValidationException("El id no puede estar vacío");
            }

            const found = await ProductManager.#repository.findById(id);

            if (!found) {
                throw new BusinessException("Producto no encontrado", "PRODNOTFOUND", 404);
            }

            return found;

            // await this.#loadProducts();

            // const found = ProductManager.#products.find(elem => elem.id === id);


        }
        catch (error) {
            throw error;
        }
    }

    // async #getProductIndexByID(id) {
    //     try {
    //         await this.#loadProducts();

    //         const found = ProductManager.#products.findIndex(elem => elem.id === id);

    //         if (found === -1) {
    //             throw new BusinessException("Producto no encontrado", "ERRPRDNFN", 404);
    //         }

    //         return found;
    //     }
    //     catch (error) {
    //         throw new BusinessException("Producto no encontrado", "ERRPRDNFN", 404);
    //     }
    // }

    // async updateProduct(id, campoActualizar, valorActualizar) {
    //     try {
    //         if (!id) {
    //             throw new BusinessException("El id no puede estar vacío");
    //         }

    //         if (!campoActualizar || !valorActualizar) {
    //             throw new BusinessException("Los campos campoActualizar y valorActualizar son obligatorios");
    //         }

    //         if (campoActualizar === 'id') {
    //             throw new BusinessException("El campo id es de uso interno y no debe modificarse ni eliminarse");
    //         }

    //         const index = await this.#getProductIndexByID(id);

    //         if (index > -1) {

    //             const newProductList = ProductManager.#products.map(product => {

    //                 if (product.id === id) {
    //                     product[campoActualizar] = valorActualizar
    //                 }

    //                 return product;
    //             });

    //             ProductManager.#fileManager.saveToFile(newProductList, ProductManager.#path);

    //             console.info(`ProductManager: Elemento con id '${id}' actualizado, campo '${campoActualizar}' seteado a '${valorActualizar}' correctamente`);
    //             return id;
    //         }

    //         throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`);
    //     }
    //     catch (error) {
    //         throw error;
    //     }
    // }

    async updateProduct(idProd, newProduct) {
        try {
            if (!idProd) {
                throw new ValidationException("El id no puede estar vacío");
            }

            if (!newProduct || !(newProduct instanceof Product)) {
                throw new ValidationException("El producto a actualizar no es válido");
            }

            const { id, ...rest } = newProduct;

            const found = await ProductManager.#repository.findByIdAndUpdate(idProd, rest);

            if (!found) {
                throw new BusinessException(`No fue encontrado ningún elemento con id '${idProd}'`, "ERRPRDNFD", 404);
            }

            console.info(`ProductManager: Elemento con id '${idProd}' actualizado`);
            return ({ idProd, ...newProduct });

            // const index = await this.#getProductIndexByID(id);

            // if (index > -1) {

            // const newProductList = ProductManager.#products.map((product) => {

            //     if (product.id === id) {
            //         product.code = newProduct.code;
            //         product.description = newProduct.description;
            //         product.price = newProduct.price;
            //         product.status = newProduct.status;
            //         product.stock = newProduct.stock;
            //         product.thumbnails = newProduct.thumbnails;
            //         product.title = newProduct.title;
            //     }

            // return product;
            // });

            // await ProductManager.#fileManager.saveToFile(newProductList, ProductManager.#path);


            //throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`, "ERRPRDNFD", 404);
        }
        catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {

            if (!id) {
                throw new BusinessException("El id no puede estar vacío");
            }

            const found = await ProductManager.#repository.findByIdAndDelete(id);

            if (!found) {
                throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`, "ERRDPRDNFN", 404);
            }

            return found;

            // const index = await this.#getProductIndexByID(id);

            // if (index > -1) {

            //     const product = ProductManager.#products[index];
            //     const newProductList = [...ProductManager.#products].filter(product => product.id != id);

            //     await ProductManager.#fileManager.saveToFile(newProductList, ProductManager.#path);

            //     console.info(`ProductManager: Elemento con id ${id} borrado`);
            //     return product;
            // }



            // throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`, "ERRDPRDNFN", 404);
        }
        catch (error) {
            throw error;
        }
    }
}