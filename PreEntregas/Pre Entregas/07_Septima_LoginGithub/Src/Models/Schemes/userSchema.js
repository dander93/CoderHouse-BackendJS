import { Schema } from 'mongoose';
import { stringRequired, stringRequiredAsIndex } from './Types/index.js';

const userSchema = new Schema({
    name: stringRequired,
    lastName: {
        type: String
    },
    birthDate: stringRequired,
    password: stringRequired,
    email: stringRequiredAsIndex,
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    githubID: {
        type: String,
        default: ''
    }
});


export {
    userSchema as default
};