const booleanRequired = {
    type: Boolean,
    required: true
}

const booleanRequiredAsindex = {
    type: Boolean,
    required: true,
    index: true
}

export {
    booleanRequired as default,
    booleanRequiredAsindex
}