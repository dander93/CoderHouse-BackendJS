import { Schema } from 'mongoose'
import cartArray from './Types/CartArray.js'

const cartSchema = new Schema({
    products: cartArray
});


export {
    cartSchema as default
}