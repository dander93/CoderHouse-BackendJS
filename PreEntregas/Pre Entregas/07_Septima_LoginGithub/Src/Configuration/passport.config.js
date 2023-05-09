import passport from "passport";
import passportLocal from 'passport-local';
import UserManager from '../Services/UserManager.js';
import CryptoService from '../Services/CryptoService.js';
import GitHubStrategy from 'passport-github2';
import ConfigigurationManager from "./ConfigurationManager.js";

const localStrategy = passportLocal.Strategy;

//TODO: refactor a class

const userManager = new UserManager();
const configuration = new ConfigigurationManager();

const initializePassport = () => {

    passport.use('register', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (request, username, password, done) => {
            try {

                const { firstName, lastName, birthDate } = request.body;

                const userExists = await userManager.findByEmail(username);
                if (userExists) {
                    return done(null, false, { message: "Error al crear el usuario" });
                }

                const user = await userManager.createUser(
                    firstName,
                    lastName,
                    birthDate,
                    await CryptoService.passwordToHash(password),
                    username,
                    'user');

                request.session.user = {
                    role: user.role,
                    name: `${user.name} ${user.lastName}`,
                    mail: user.email
                };

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
                    throw new Error('Error al obtener el correo de la cuenta. Verificar el mail público de la cuenta');
                }

                const user = await userManager.findByEmail(profile._json.email);

                if (user) {
                    return done(null, user);
                }

                const result = await userManager.createUser(
                    profile._json.name,
                    profile._json.name,
                    new Date().toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                    await CryptoService.passwordToHash("pAssWorDDef4uLt!#"),
                    profile._json.email,
                    'user',
                    profile.username);

                return done(null, result);
            }
            catch (error) {
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
                        name: 'admin coder',
                        mail: username
                    };

                    return done(null, request.session.user);
                }

                const user = await userManager.findByEmail(username);

                if (!user) {
                    console.error('El usuario no existe ' + username);
                    return done(null, false);
                }

                if (!await CryptoService.comparePassword(password, user.password)) {
                    console.error(`La password proporcionada por el usuario '${username}' no fue correcta`);
                    return done(null, false);
                }

                request.session.user = {
                    role: user.role,
                    name: `${user.name} ${user.lastName}`,
                    mail: user.email
                };

                return done(null, user);
            }
            catch (error) {
                return done(error);
            }
        })
    );

    passport.serializeUser((user, done) => {
        try {

            done(null, user.email);
        }
        catch (error) {
            console.error(error);
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