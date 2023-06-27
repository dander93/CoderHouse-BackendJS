import { Schema } from "mongoose";
import { stringRequiredUniqueAsIndex, numberRequired, stringRequired } from './Types/index.js';

const ticketSchema = new Schema({
    code: stringRequiredUniqueAsIndex,
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: numberRequired,
    purchaser: stringRequired
});

export {
    ticketSchema as default
};