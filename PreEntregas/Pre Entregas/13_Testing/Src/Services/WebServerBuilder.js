import express from 'express';
import { endpointLogger, exceptionHandlerMiddleware } from '../Middlewares/index.js';
import * as constants from '../Models/Constants/Constants.js';
import handlebars from 'express-handlebars';
import validators from '../Helpers/handlebarsHelpers.js';
// import * as controllers from '../Controllers/index.js';
import ConfigigurationManager from '../Configuration/ConfigurationManager.js';
import initializePassport from '../Configuration/passport.config.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import SwaggerConfiguration from '../Configuration/SwaggerConfiguration.js';
import * as routers from '../Routes/index.js';

export default class WEbServerBuilder {

    #server;
    #configuration;

    constructor() {
        try {
            if (!this.#server) {

                this.#server = express();

                this.#configuration = new ConfigigurationManager();

                this.#addDefaultMiddlewares();
                this.#setupRoutes();
                this.#addDocumentation();
                this.#server.use(exceptionHandlerMiddleware);
            }
        }
        catch (error) {
            throw error;
        }
    }

    getServer() {
        return this.#server;
    }

    #addDocumentation() {
        this.#server.use(
            this.#configuration.EXPRESS_CONFIGURATION.DOCUMENTATION_BASE_ROUTE,
            swaggerUI.serve,
            swaggerUI.setup(SwaggerConfiguration.getSwaggerSpecs()));
    }

    #addMiddleware(middleware) {
        this.#server.use(middleware);
    }

    #addDefaultMiddlewares() {
        this.#addMiddleware(express.json());
        this.#addMiddleware(express.urlencoded({ extended: true }));
        // this.#addMiddleware(endpointLogger);

        //ruta de archivos estaticos publicos
        this.#addMiddleware(express.static(constants.APP_PUBLIC_PATH));

        this.#setupHandlebarss();
        this.#setupPassport();
    }


    #setupHandlebarss() {
        this.#server.engine('handlebars', handlebars.engine({
            partialsDir: constants.APP_PARTIAL_VIEWS_PATH,
            helpers: validators,
            allowProtoProperties: true,
            allowProtoMethodsByDefault: true
        }));

        this.#server.set('views', constants.APP_VIEWS_PATH);
        this.#server.set('view engine', 'handlebars');
    }

    #setupRoutes() {
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.PRODUCTS_BASE_ROUTE, routers.ProductRouter);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.CARTS_BASE_ROUTE, routers.CartRouter);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.HANDLEBARS_BASE_ROUTE, routers.HandlebarsRouter);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.USERS_BASE_ROUTE, routers.UserRouter);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.OAUTH_BASE_ROUTE, routers.OauthRouter);
    }

    #setupPassport() {

        this.#server.use(cookieParser());
        this.#server.use(session({
            store: MongoStore.create({
                mongoUrl: this.#configuration.MONGOOSE_CONFIGURATION.connectionString,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: 15000
            }),
            secret: "CoderS3cret",
            resave: false,
            saveUninitialized: true
        }));

        initializePassport();
        this.#server.use(passport.initialize());
        this.#server.use(passport.session());
    }
}