import ProductBase from "./ProductBase.js"

export default class Product extends ProductBase {
    constructor(title, description, price, thumbnail, stock, code) {
        super(title, description, price, thumbnail, stock, code);
    }
}