import { AggregatedException, ExceptionHandler, ValidationException } from '../Exceptions/index.js';

export default class ProductBase {

    #validationErrors = [];

    constructor(title, description, price, thumbnail, stock, code) {
        try {
            this.#validateInput(title, description, price, thumbnail, stock, code);

            this.id = Date.now().toString();
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnail = thumbnail;
            this.stock = stock;
            this.code = code;

        } catch (error) {
            ExceptionHandler.handle(error);
        }
    }

    #validateInput(title, description, price, thumbnail, stock, code) {

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

        if (!this.#isValidThumbnail(thumbnail)) {
            this.#validationErrors.push(
                new ValidationException("La imagen no puede estar vacía"));
        }

        if (!this.#isValidStock(stock)) {
            this.#validationErrors.push(
                new ValidationException("El stock no puede estar vacío y debe ser un valor entero mayor a 0"));
        }

        if (!this.#isValidCode(code)) {
            this.#validationErrors.push(
                new ValidationException("El codigo de producto no puede estar vacío"));
        }

        if (this.#validationErrors.length > 0) {
            throw new AggregatedException("Hubo errores al crear el producto", this.#validationErrors);
        }
    }

    #isValidTitle = (title) => typeof title === "string" && title;

    #isValidDescription = (description) => typeof description === "string" && description;

    #isValidPrice = (price) => !isNaN(price) && price >= 0;

    #isValidThumbnail = (thumb) => typeof thumb === "string" && thumb;

    #isValidStock = (stock) => typeof stock === 'number' && !isNaN(stock) && Number.isInteger(stock) && stock % 1 === 0;

    #isValidCode = (code) => typeof code === "string" || code;

    isValidProduct = () => this.#validationErrors.length === 0;

}