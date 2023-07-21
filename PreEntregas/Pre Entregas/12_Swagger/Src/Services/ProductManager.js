import { BusinessException, ValidationException } from "../Models/Exceptions/index.js";
import Product from "../Models/Product.js";
import DataAccessService from './DataAccessService.js';
import { productSchema } from '../Models/Schemes/index.js';
import QueryParamsHelper from '../Helpers/QueryParamsHelper.js';
import { fakerES as faker } from '@faker-js/faker';
import ConfigigurationManager from "../Configuration/ConfigurationManager.js";

export default class ProductManager {

    static #repository;
    static #mockedProducts;

    constructor() {
        try {

            if (!ProductManager.#repository) {
                ProductManager.#repository =
                    new DataAccessService()
                        //FIXME: quitar magic string
                        .getRepository("products", productSchema);
                ConfigigurationManager.logger.info("ProductManager: Configurando repositorio");
            }

            if (!ProductManager.#mockedProducts) {

                ProductManager.#mockedProducts = Array.from({ length: 100 }, () => this.#createMockedProduct());

                ConfigigurationManager.logger.info("ProductManager: Agregados 100 productos mockeados");
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

            ConfigigurationManager.logger.info(`ProductManager: Elemento con id '${idProd}' actualizado`);
            return ({ idProd, ...newProduct });
        }
        catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            ConfigigurationManager.logger.info(id);
            if (!id) {
                throw new ValidationException("El id no puede estar vacío");
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

    async getMockedProducts(limit, page, sort, query) {

        const paginateProducts = (products, pageSize, pageNumber) => {
            return products.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
        };

        const getOrderingFn = (sortingAs) => {
            if (sortingAs === 'asc' || undefined) {
                return (productA, productB) => productA.price >= productB.price;
            }
            else {
                if (sortingAs === 'desc') {
                    return (productA, productB) => productA.price < productB.price;
                }
            }
        };

        const sortProducts = (products) => products.sort(getOrderingFn(sort));

        return sortProducts(paginateProducts(ProductManager.#mockedProducts, limit, page));
    }

    #createMockedProduct(seed) {

        if (seed) {
            faker.seed(seed);
        }

        const id = faker.database.mongodbObjectId();

        const product = {
            _id: id,
            title: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbnails: Array.from({ length: Math.floor(Math.random() + 1 * 4) }, () => {
                return faker.image.url();
            }),
            stock: faker.number.int({ min: 1, max: 999 }),
            code: faker.string.alphanumeric(10),
            category: faker.commerce.department(),
            status: Math.random() < 0.8,
            id: id
        };

        return product;
    }
}