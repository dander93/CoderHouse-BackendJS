const validators = {
    eq: (arg1, arg2, options) => {
        return (arg1 === arg2) ? true : false;
    },
    toJSON: (object) => {
        return JSON.stringify(object)
    }
}

export default validators;