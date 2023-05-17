const renameIDandUnderslashV = (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
}


export {
    renameIDandUnderslashV as default
}