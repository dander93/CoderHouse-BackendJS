import { Schema } from 'mongoose'
import { MONGOOSE_CONFIGURATION } from '../Constants/Constants.js';
import renameIDandUnderslashV from '../../Helpers/SchemesGenericRenameProps.js'

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
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: renameIDandUnderslashV
        }
    }
);


cartSchema.pre('findOne', function (next) {
    this.populate("products.productID");
    next();
})


export {
    cartSchema as default
}