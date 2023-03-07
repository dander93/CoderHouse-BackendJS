
import ProductManager from "./App/Services/ProductManager.js";
import Product from "./App/Models/Product.js";

const PODUCTS_FILE_PATH = "./data/Products.json";

const PRODUCT_PRICE_FIELD = "price";

(async () => {
    const productMan = new ProductManager(PODUCTS_FILE_PATH);

    console.log(await productMan.getProducts());

    await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc123"));

    console.log(await productMan.getProducts());

    console.log(await productMan.getProductByID("1678149851212"));
    console.log(await productMan.getProductByID("1678078092882"));

    console.log(await productMan.updateProduct("1678149851212", PRODUCT_PRICE_FIELD, 150));
    console.log(await productMan.updateProduct("1678148920832", PRODUCT_PRICE_FIELD, 150));

    console.log(await productMan.deleteProduct("1678149718636"));
    console.log(await productMan.deleteProduct("1678146727222"));
})();