const MONGOOSE_CONFIGURATION = {
    url: 'mongodb://127.0.0.1',
    port: '27017',
    db: 'ecommerce',
}

MONGOOSE_CONFIGURATION.connectionString = `${MONGOOSE_CONFIGURATION.url}:${MONGOOSE_CONFIGURATION.port}/${MONGOOSE_CONFIGURATION.db}`;


export {
    MONGOOSE_CONFIGURATION as default,
}