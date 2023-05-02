import passport from "passport";
import passportLocal from 'passport-local';

const localStrategy = passportLocal.Strategy;


const initializePassport = () => {

    passport.use('register', new localStrategy(

        { passReqToCallback: true, usernameField: 'email' },

        async (request, username, password, done) => {

            try {

                const { first_name, last_name, email, age } = request.body;

//TODO: terminar esto
            }
            catch (error) {

            }
        }

    ));

};



export {
    initializePassport as default
};