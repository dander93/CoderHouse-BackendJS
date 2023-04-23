import { Schema } from 'mongoose'
import { booleanRequired, numberRequired, stringRequired } from './Types/index.js'

const productSchema = new Schema({
    title: stringRequired,
    description: stringRequired,
    price: numberRequired,
    thumbnails: [],
    stock: numberRequired,
    code: stringRequired,
    category: stringRequired,
    status: booleanRequired
});

export {
    productSchema as default
}