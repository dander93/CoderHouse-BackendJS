import { TechnicalException } from '../Models/Exceptions/index.js';
import dotenv from 'dotenv';
import { GITHUB_CALLBACK_ENV_KEY, GITHUB_CLIENT_ID_ENV_KEY, GITHUB_CLIENT_SECRET_ENV_KEY } from '../Models/Constants/OauthConfigurationConstants.js';

export default class OauthConfiguration {

    GITHUB_CLIENT_ID;
    GITHUB_CLIENT_SECRET;
    GITHUB_CALLBACK_URL;

    constructor() {
        dotenv.config();

        this.GITHUB_CLIENT_ID = this.#getGithubClientID();
        this.GITHUB_CLIENT_SECRET = this.#getGithubCLientSecret();
        this.GITHUB_CALLBACK_URL = this.#getGithubCallback();


        if (!Object.isFrozen(this)) {
            Object.freeze(this);
        }
    }

    #getGithubClientID() {
        try {
            const clientID = process.env[GITHUB_CLIENT_ID_ENV_KEY];

            if (!clientID) {
                throw new TechnicalException('Error al obtener client id de github', null, 'EROAUCID500', 500);
            }

            console.log('OauthConfiguration - ClientID obtenido');
            return clientID;
        }
        catch (error) {
            throw error;
        }
    }

    #getGithubCLientSecret() {
        try {
            const clientSecret = process.env[GITHUB_CLIENT_SECRET_ENV_KEY];

            if (!clientSecret) {
                throw new TechnicalException('Error al obtener el client secret de github', null, 'EROAUCSE500', 500);
            }

            console.log('OauthConfiguration - ClientSecret obtenido');
            return clientSecret;
        }
        catch (error) {
            throw error;
        }
    }

    #getGithubCallback() {
        try {
            const callbackUrl = process.env[GITHUB_CALLBACK_ENV_KEY];

            if (!callbackUrl) {
                throw new TechnicalException('Error al obtener el callback de github', null, 'EROAUGCB500', 500);
            }

            console.log('OauthConfiguration - callbackURL obtenido');
            return callbackUrl;
        }
        catch (error) {
            throw error;
        }
    }


}