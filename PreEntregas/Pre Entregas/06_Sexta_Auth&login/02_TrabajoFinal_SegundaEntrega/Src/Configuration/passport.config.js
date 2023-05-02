import passport from "passport";
import passportLocal from 'passport-local';
import UserManager from '../Services/UserManager.js';
import CryptoService from '../Services/CryptoService.js';

const localStrategy = passportLocal.Strategy;

//TODO: refactor a class

const userManager = new UserManager();

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
        }));

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