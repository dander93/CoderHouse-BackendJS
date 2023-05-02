import { BusinessException, ValidationException } from "../Models/Exceptions/index.js";
import Product from "../Models/Product.js";
import DataAccessService from './DataAccessService.js';
import { productSchema } from '../Models/Schemes/index.js';
import QueryParamsHelper from "../Helpers/QueryParamsHelper.js";

export default class ProductManager {

    static #repository;

    constructor() {
        try {

            if (!ProductManager.#repository) {
                ProductManager.#repository =
                    new DataAccessService()
                        //FIXME: quitar magic string
                        .getRepository("products", productSchema);
                console.info("ProductManager: Configurando repositorio");
            }
        }
        catch (error) {
            throw error;
        }
    }

    async getProducts(limit, page, sort, query) {
        try {

            let paginateOptions = {
                limit: limit,
                page: page,
                lean: true,
                select: '-__v'
            };

            if (sort) {
                paginateOptions = {
                    ...paginateOptions,
                    sort: {
                        price: sort
                    }
                };
            }

            return await ProductManager.#repository.paginate(
                new QueryParamsHelper().getValidProductQueryFilters(query),
                paginateOptions);
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
        }
        catch (error) {
            throw error;
        }
    }

    async addProduct(product) {
        try {

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
        }
        catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            console.log(id);
            if (!id) {
                throw new BusinessException("El id no puede estar vacío");
            }

            const found = await ProductManager.#repository.findByIdAndDelete(id);

            if (!found) {
                throw new BusinessException(`No fue encontrado ningún elemento con id '${id}'`, "ERRDPRDNFN", 404);
            }

            return found;
        }
        catch (error) {
            throw error;
        }
    }

    async getAllCategorys() {
        try {
            return await ProductManager.#repository.distinct('category');
        }
        catch (error) {
            throw error;
        }
    }
}