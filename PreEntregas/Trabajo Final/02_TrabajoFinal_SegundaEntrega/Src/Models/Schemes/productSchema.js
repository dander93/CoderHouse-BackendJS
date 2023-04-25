import { Schema } from 'mongoose'
import { numberRequired, stringRequired } from './Types/index.js'
import mongoosePaginate from 'mongoose-paginate-v2'
import { stringRequiredAsIndex } from './Types/StringRequired.js';
import { booleanRequiredAsindex } from './Types/BooleanRequired.js';
import renameIDandUnderslashV from '../../Helpers/SchemesGenericRenameProps.js'

const productSchema = new Schema(
    {
        title: stringRequired,
        description: stringRequired,
        price: numberRequired,
        thumbnails: [],
        stock: numberRequired,
        code: stringRequired,
        category: stringRequiredAsIndex,
        status: booleanRequiredAsindex
    },
    {
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: renameIDandUnderslashV
        }
    }
);


productSchema.plugin(mongoosePaginate);

export {
    productSchema as default
}