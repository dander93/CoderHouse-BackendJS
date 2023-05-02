const stringRequired = {
    type: String,
    required: true
}

const stringRequiredAsIndex = {
    type: String,
    required: true,
    index: true
}

export {
    stringRequired as default,
    stringRequiredAsIndex
}