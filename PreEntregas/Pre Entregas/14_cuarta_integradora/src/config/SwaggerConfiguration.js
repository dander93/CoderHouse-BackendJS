import swaggerJsdoc from 'swagger-jsdoc';
import __dirname from '../util.js'

export default class SwaggerConfiguration {

    static #getSwaggerOptions() {

        console.log(__dirname)
        return {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'Api de estudiantes',
                    description: 'Descripcion',
                    version: '0.0.0.1'
                }
            },

            apis: [`${__dirname}/docs/**/*.yaml`]
        };


    }

    static getSwaggerSpecs() {
        return swaggerJsdoc(SwaggerConfiguration.#getSwaggerOptions());
    }
}