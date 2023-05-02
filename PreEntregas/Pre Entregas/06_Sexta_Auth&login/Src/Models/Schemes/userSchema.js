import { Schema } from 'mongoose';
import { stringRequired,stringRequiredAsIndex } from './Types/index.js';

const userSchema = new Schema({
    name: stringRequired,
    lastName: stringRequired,
    birthDate: stringRequired,
    password: stringRequired,
    email: stringRequiredAsIndex,
    role: {
        type: String,
        required: true,
        default: 'user'
    }
});


export {
    userSchema as default
};