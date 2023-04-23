const validators = {
    eq: (arg1, arg2, options) => {
        return (arg1 === arg2) ? true : false;
    }
}

export default validators;