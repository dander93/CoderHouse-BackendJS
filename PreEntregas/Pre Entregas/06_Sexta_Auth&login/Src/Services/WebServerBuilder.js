import express from 'express';
import { endpointLogger, exceptionHandlerMiddleware } from '../Middlewares/index.js';
import * as constants from '../Models/Constants/Constants.js';
import handlebars from 'express-handlebars';
import validators from '../Helpers/handlebarsHelpers.js';
import { ProductController, CartController, HandlebarsController, UserController } from '../Controllers/index.js';
import ConfigigurationManager from '../Configuration/ConfigurationManager.js';
import initializePassport from '../Configuration/passport.config.js';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

export default class WEbServerBuilder {

    #server;
    #configuration;

    constructor() {
        try {

            this.#server = express();

            this.#configuration = new ConfigigurationManager();

            this.#addDefaultMiddlewares();
            this.#setupRoutes();
            this.#server.use(exceptionHandlerMiddleware);
        }
        catch (error) {
            throw error;
        }
    }

    getServer() {
        return this.#server;
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
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.PRODUCTS_BASE_ROUTE, ProductController);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.CARTS_BASE_ROUTE, CartController);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.HANDLEBARS_BASE_ROUTE, HandlebarsController);
        this.#server.use(this.#configuration.EXPRESS_CONFIGURATION.USERS_BASE_ROUTE, UserController);
    }

    #setupPassport() {

        this.#server.use(cookieParser());
        this.#server.use(session({
            store: MongoStore.create({
                mongoUrl: this.#configuration.MONGOOSE_CONFIGURATION.connectionString,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: 15
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