import { Router } from "express";
import { getLogin, getLogout, getRegister, postLogin, postRegister } from "../Controllers/User.Controller.js";
import { endpointAuthRequired } from '../Middlewares/index.js';

const route = Router();

route.get('/register', getRegister);
route.post('/register', postRegister);
route.get('/login', getLogin);
route.post('/login', postLogin);
route.get('/logout', endpointAuthRequired, getLogout);

export {
    route as default
};