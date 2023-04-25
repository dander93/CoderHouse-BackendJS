import { Schema } from 'mongoose'
import { MONGOOSE_CONFIGURATION } from '../Constants/Constants.js';

const cartSchema = new Schema({
        products: {
            type: [{
                productID: {
                    type: Schema.Types.ObjectId,
                    ref: MONGOOSE_CONFIGURATION.collections.products
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }]
        }
    },
    { versionKey: false }
);


cartSchema.pre('findOne', function (next) {
    this.populate("products.productID");

    console.log(this)

    next();
})

export {
    cartSchema as default
}