import { Schema } from 'mongoose'

const cartProduct = {
    productID: {
        type: Schema.Types.ObjectId,
        //FIXME: quitar magic string
        ref: "products",
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
}

export default cartProduct;