import { Schema } from 'mongoose'
import {cartArray} from './Types/index.js'

const cartSchema = new Schema({
    products: cartArray
});


export {
    cartSchema as default
}