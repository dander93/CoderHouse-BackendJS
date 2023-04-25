const renameIDandUnderslashV = (doc, ret, game) => {
    delete ret.__v;

    ret.id = ret._id;
    delete ret._id;
}

export {
    renameIDandUnderslashV as default
}