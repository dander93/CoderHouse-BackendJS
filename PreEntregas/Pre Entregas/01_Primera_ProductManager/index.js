import Product from "./App/Models/Product.js";
import ProductManager from "./App/ProductManager.js";
import { randomUUID } from 'crypto'

(() => {
    const productMan = new ProductManager();

    productMan.addProduct(
        new Product("", "producto de testing", 1.4, "imagen.jpg", "fafafz  ", "asdfzcxv"));
    productMan.addProduct(
        new Product(null, "producto de testing", 1.4, "imagen.jpg", "fafafz  ", "sadf"));
    productMan.addProduct(
        new Product(undefined, "producto de testing", 1.4, "imagen.jpg", "fafafz  ", "fasdfsdf"));
    productMan.addProduct(
        new Product(12134, "producto de testing", 1.4, "imagen.jpg", "fafafz  ", "afafasddfasdf"));

    productMan.addProduct(
        new Product("producto_Error_Test02", "producto de testing", 2.3, "imagen.jpg", 1.2, "codigo1"));
    productMan.addProduct(
        new Product("producto_Error_Test03", "producto de testing", 3.3, "imagen.jpg", 2.3, "codigo2"));
    productMan.addProduct(
        new Product("producto_Error_Test04", "producto de testing", -3.3, "imagen.jpg", 3.3, "codigo3"));
    productMan.addProduct(
        new Product("producto_Error_Test05", "producto de testing", -3.3, "imagen.jpg", 4, "codigo4"));
    productMan.addProduct(
        new Product("producto_Error_Test05", "producto de testing", -3.3, "imagen.jpg", 4, "codigo4"));

    productMan.addProduct(
        new Product("producto_OK_Test01", "producto de testing", 28.3, "imagen.jpg", 5, "codigoOk1"));
    productMan.addProduct(
        new Product("producto_OK_Test02", "producto de testing", 28.3, "imagen.jpg", 5, randomUUID()));

    productMan.addProduct(
        new Product("producto_ERR_CODIGO_REPETIDO", "producto de testing", 28.3, "imagen.jpg", 5, "codigoOk1"));

    console.log("--------------------------------------");
    console.log(productMan.getProducts());

    console.log("--------------------------------------");
    console.log(productMan.getProductById("codigoOk1"))
    
})();

