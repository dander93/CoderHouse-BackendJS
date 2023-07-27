import passport from "passport";
import passportLocal from 'passport-local';
import UserManager from '../Services/UserManager.js';
import CartManager from '../Services/CartManager.js';
import CryptoService from '../Services/CryptoService.js';
import GitHubStrategy from 'passport-github2';
import ConfigigurationManager from "./ConfigurationManager.js";
import ValidationException from "../Models/Exceptions/ValidationException.js";

const localStrategy = passportLocal.Strategy;

//TODO: refactor a class

const userManager = new UserManager();
const cartManager = new CartManager();
const configuration = new ConfigigurationManager();

const initializePassport = () => {

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (request, username, password, done) => {
            try {

                const { firstName, lastName, age } = request.body;

                const userExists = await userManager.findByEmail(username);
                if (userExists) {
                    return done(null, false, { message: "Error al crear el usuario" });
                }

                const user = await userManager.createUser(
                    firstName,
                    lastName,
                    age,
                    await CryptoService.passwordToHash(password),
                    username,
                    'user',
                    await cartManager.createCart());

                // const { _id, __v, password, ...secureUser } = user;

                request.session.user = user;

                return done(null, user);
            }
            catch (error) {
                return done(`ERROR al registrar: ${error}`);
            }
        }
    ));

    passport.use('github', new GitHubStrategy(
        {
            clientID: configuration.OAUTH_CONFIGURATION.GITHUB_CLIENT_ID,
            clientSecret: configuration.OAUTH_CONFIGURATION.GITHUB_CLIENT_SECRET,
            callbackUrl: configuration.OAUTH_CONFIGURATION.GITHUB_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                if (!profile._json.email) {
                    throw new ValidationException('Error al obtener el correo de la cuenta. Verificar el mail público de la cuenta');
                }

                let user = await userManager.findByEmail(profile._json.email);

                if (user) {
                    return done(null, user);
                }

                /*
                 * Lo ideal sería redrigirlo a una vista donde llene los datos que faltan para completar el perfil (password y nombre de usuario)
                 * */
                user = await userManager.createUser(
                    profile._json.name,
                    profile._json.name,
                    99,
                    await CryptoService.passwordToHash("pAssWorDDef4uLt!#"),
                    profile._json.email,
                    'user',
                    await cartManager.createCart(),
                    profile._json.login
                );

                return done(null, user);
            }
            catch (error) {
                ConfigigurationManager.logger.error(error);
                return done(error);
            }
        }));

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (request, username, password, done) => {
            try {

                if (username == 'adminCoder@coder.com' &&
                    password == 'adminCod3r123') {

                    request.session.user = {
                        role: 'admin',
                        first_name: 'admin',
                        last_name: 'coder',
                        email: username
                    };

                    return done(null, request.session.user);
                }

                const user = await userManager.findByEmail(username);

                if (!user) {
                    ConfigigurationManager.logger.error('El usuario no existe ' + username);
                    return done(null, false);
                }

                if (!await CryptoService.comparePassword(password, user.password)) {
                    ConfigigurationManager.logger.error(`La password proporcionada por el usuario '${username}' no fue correcta`);
                    return done(null, false);
                }

                const { _id, __v, ...securedUser } = user.toObject();
                delete securedUser.password;

                request.session.user = securedUser;

                return done(null, user);
            }
            catch (error) {
                ConfigigurationManager.logger.error(error);
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        try {

            done(null, user.email);
        }
        catch (error) {
            ConfigigurationManager.logger.error(error);
        }
    });

    passport.deserializeUser(async (email, done) => {
        try {
            const user = await userManager.findByEmail(email);
            done(null, user);
        } catch (error) {
            done(`Error al deserializar el usuairo ${error}`);
        }
    });

};

export {
    initializePassport as default
};