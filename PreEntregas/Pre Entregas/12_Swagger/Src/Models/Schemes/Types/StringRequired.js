const stringRequired = {
    type: String,
    required: true
};

const stringRequiredAsIndex = {
    ...stringRequired,
    index: true
};

const stringRequiredUniqueAsIndex = {
    ...stringRequiredAsIndex,
    unique: true
};

const stringWithDefault = defaultValue => {
    return ({
        type: String,
        default: defaultValue
    });
};


const stringRequiredWithDefault = defaultValue => {
    return ({
        ...stringRequired,
        default: defaultValue
    });
};

export {
    stringRequired as default,
    stringRequiredAsIndex,
    stringRequiredUniqueAsIndex,
    stringRequiredWithDefault,
    stringWithDefault
};