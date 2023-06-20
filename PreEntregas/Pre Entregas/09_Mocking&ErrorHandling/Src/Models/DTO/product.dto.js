export default class productDTO {

    constructor(
        title,
        description,
        price,
        thumbnails,
        stock,
        code,
        category,
        status
    ) {
            this.title = title;
            this.description = description;
            this.price = price;
            this.thumbnails = thumbnails;
            this.stock = stock;
            this.code = code;
            this.category = category;
            this.status = status;
    }
}