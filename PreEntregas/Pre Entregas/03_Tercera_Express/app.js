import express from 'express';
import ProductManager from "./App/Services/ProductManager.js";
import { DEFAULT_EXPRESS_PORT, PRODUCTS_FILE_PATH } from './App/Models/Constants.js'


const productMan = new ProductManager(PRODUCTS_FILE_PATH);

const app = express();



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