import express from 'express';
import ProductManager from "./App/Services/ProductManager.js";
import { DEFAULT_EXPRESS_PORT, PRODUCTS_FILE_PATH } from './App/Models/Constants.js'

import Product from './App/Models/Product.js';

const productMan = new ProductManager(PRODUCTS_FILE_PATH);

const app = express();

// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc123"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc124"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc125"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc126"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc127"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc128"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc129"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc130"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc131"));
// await productMan.addProduct(new Product("producto prueba", "Este es un producto prueba", 200, "Sin imagen", 25, "abc132"));

// app.get('/', (request, response) => response.redirect("/products"));

app.get('/products', async (request, response) => {

    const { limit } = request.query;

    if (limit && isNaN(limit)) {
        return response.status(500).send("El valor limitante debe ser numérico");
    }

    const products = await productMan.getProducts();

    response.status(200).send(limit ? products.splice(0, Number.parseInt(limit)) : products);
});


app.get('/products/:pid', async (request, response) => {

    if (isNaN(request.params.pid)) {
        return response.status(500).send("El valor solicitado debe ser numérico");
    }


    const found = await productMan.getProductByID(request.params.pid);

    response.send(found);
});

app.listen(DEFAULT_EXPRESS_PORT, () => {
    console.log(`Servidor escuchando en puerto: ${DEFAULT_EXPRESS_PORT}`)
});