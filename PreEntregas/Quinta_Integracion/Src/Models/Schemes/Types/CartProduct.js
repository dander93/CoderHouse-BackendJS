import stringRequired from "./StringRequired.js";

const cartProduct = {
    quantity: {
        type: Number,
        default: 0
    },
    productID: stringRequired
}

export default cartProduct;