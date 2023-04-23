import { Schema } from 'mongoose'
import { stringRequired } from './Types/index.js'

const messaggeSchema = new Schema({
    user: stringRequired,
    message: stringRequired
});


export {
    messaggeSchema as default
}