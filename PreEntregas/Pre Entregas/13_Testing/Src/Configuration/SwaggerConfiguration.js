import swaggerJsdoc from 'swagger-jsdoc';
import __app_base_dirname from '../Helpers/pathUtils.js'

export default class SwaggerConfiguration {

    static #getSwaggerOptions() {

        return {
            definition: {
                openapi: '3.0.1',
                info: {
                    title: 'Api de shop',
                    description: 'Endpoints correspondientes al manejo del shop',
                    version: '0.0.0.1'
                }
            },

            apis: [`${__app_base_dirname}/doc/**/*.yaml`]
        };


    }

    static getSwaggerSpecs() {
        return swaggerJsdoc(SwaggerConfiguration.#getSwaggerOptions());
    }
}