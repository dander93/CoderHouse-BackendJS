import { Schema } from 'mongoose'
import renameIDandUnderslashV from '../../Helpers/SchemesGenericRenameProps.js'

const cartSchema = new Schema({
    products: {
        type: [{
            productID: {
                type: Schema.Types.ObjectId,
                //FIXME: quitar magic string
                ref: "products"
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