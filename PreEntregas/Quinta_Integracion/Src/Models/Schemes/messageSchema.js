import { Schema } from 'mongoose'
import { message } from './Types/index.js'

const messaggeSchema = new Schema({
    messages: [message]
});


export {
    messaggeSchema as default
}