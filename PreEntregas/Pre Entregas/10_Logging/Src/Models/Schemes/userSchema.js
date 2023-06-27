import { Schema } from 'mongoose';
import { numberRequired, stringRequired, stringRequiredUniqueAsIndex, stringRequiredWithDefault, stringWithDefault } from './Types/index.js';

const userSchema = new Schema({
    first_name: stringRequired,
    last_name: stringRequired,
    email: stringRequiredUniqueAsIndex,
    age: numberRequired,
    password: stringRequired,
    role: stringRequiredWithDefault('user'),
    githubID: stringWithDefault(''),
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
});


userSchema.pre('findOne', function (next) {
    this.populate('cart');
    next();
})

export {
    userSchema as default
};