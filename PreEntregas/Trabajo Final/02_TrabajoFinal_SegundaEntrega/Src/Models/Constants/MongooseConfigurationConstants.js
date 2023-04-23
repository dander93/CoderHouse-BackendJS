const MONGOOSE_CONFIGURATION = {
    url: 'mongodb://127.0.0.1',
    port: '27017',
    db: 'ecommerce',
    collections:{
        products: 'products',
        carts: 'carts',
        messages: 'messages'
    }
}

MONGOOSE_CONFIGURATION.connectionString = `${MONGOOSE_CONFIGURATION.url}:${MONGOOSE_CONFIGURATION.port}/${MONGOOSE_CONFIGURATION.db}`;

export {
    MONGOOSE_CONFIGURATION as default,
}