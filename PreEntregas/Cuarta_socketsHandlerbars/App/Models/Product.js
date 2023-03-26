import ProductBase from "./ProductBase.js"

export default class Product extends ProductBase {
    constructor(title, description, price, thumbnails, stock, code, category, status = true) {
        super(title, description, price, thumbnails, stock, code, category, status);
    }
}