import { AggregatedException, ValidationException } from './Exceptions/index.js';
// import {randomUUID} from 'crypto'

export default class ProductBase {

    #validationErrors = [];

    constructor(title, description, price, thumbnails, stock, code, category, status) {
        console.log(`categoria: ${category} - ${typeof category}`);
        try {
            this.#validateInput(title, description, price, thumbnails, stock, code, category, status);

            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnails = thumbnails;
            this.stock = stock;
            this.code = code;
            this.category = category;
            this.status = status || true;
        }
        catch (error) {
            throw error;
        }
    }

    #validateInput(title, description, price, thumbnail, stock, code, category, status) {

        if (!this.#isValidTitle(title)) {
            this.#validationErrors.push(
                new ValidationException("El nombre del producto no puede estar vacío y debe ser una cadena de texto"));
        }

        if (!this.#isValidDescription(description)) {
            this.#validationErrors.push(
                new ValidationException("La descripcion no puede estar vacía"));
        }

        if (!this.#isValidPrice(price)) {
            this.#validationErrors.push(
                new ValidationException("El precio no puede estar vacío y debe ser un número mayor a 0"));
        }

        if (!this.#isValidThumbnails(thumbnail)) {
            this.#validationErrors.push(
                new ValidationException("La lista de imagenes no es válida"));
        }

        if (!this.#isValidStock(stock)) {
            this.#validationErrors.push(
                new ValidationException("El stock no puede estar vacío y debe ser un valor entero mayor a 0"));
        }

        if (!this.#isValidCode(code)) {
            this.#validationErrors.push(
                new ValidationException("El codigo de producto no puede estar vacío"));
        }

        if (!this.#isValidCategory(category)) {
            this.#validationErrors.push(
                new ValidationException("La categoria del producto no puede estar vacía"));
        }

        if (!this.#isValidStatus(status)) {
            console.log(status && typeof status === 'boolean')
            this.#validationErrors.push(
                new ValidationException("El status debe ser un valor booleano(true o false)"));
        }

        if (this.#validationErrors.length > 0) {
            throw new AggregatedException("Hubo errores al generar el producto", this.#validationErrors, "ERRVALIDATION", 400);
        }
    }

    #isValidTitle = (title) => typeof title === "string" && title;

    #isValidDescription = (description) => typeof description === "string" && description;

    #isValidPrice = (price) => !isNaN(price) && price >= 0;

    //TODO: ¿validar cada thumb con un regex?
    #isValidThumbnails = (thumbs) =>
        (typeof thumbs === "object" &&
            (thumbs === null ||
                thumbs.every(thumb => typeof thumb === 'string'))) ||
        typeof thumbs === "undefined";

    #isValidStock = (stock) => typeof stock === 'number' && !isNaN(stock) && Number.isInteger(stock) && stock % 1 === 0;

    #isValidCode = (code) => typeof code === "string" || code;

    #isValidCategory = (category) => typeof category === "string" || category;

    #isValidStatus = (status) => typeof status === 'boolean' || status;

    isValidProduct = () => this.#validationErrors.length === 0;
}