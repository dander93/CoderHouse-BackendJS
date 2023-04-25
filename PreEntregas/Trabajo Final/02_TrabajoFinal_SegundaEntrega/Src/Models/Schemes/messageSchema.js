import { Schema } from 'mongoose'
import { stringRequired } from './Types/index.js'
import renameIDandUnderslashV from '../../Helpers/SchemesGenericRenameProps.js'

const messaggeSchema = new Schema(
    {
        user: stringRequired,
        message: stringRequired
    }
    // {
    //     toJSON: {
    //         transform: renameIDandUnderslashV
    //     }
    // }
    );


export {
    messaggeSchema as default
}