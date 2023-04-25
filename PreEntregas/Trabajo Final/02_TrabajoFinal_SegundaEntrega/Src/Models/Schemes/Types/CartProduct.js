import { MONGOOSE_CONFIGURATION } from "../../Constants/Constants.js";
import { Schema } from 'mongoose'

const cartProduct = {
    productID: {
        type: Schema.Types.ObjectId,
        ref: MONGOOSE_CONFIGURATION.collections.products,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    }
}

export default cartProduct;