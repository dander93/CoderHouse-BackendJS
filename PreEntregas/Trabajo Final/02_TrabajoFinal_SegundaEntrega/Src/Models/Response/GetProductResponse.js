import CommonResponse from "./CommonResponse.js";

export default class GetProductResponse extends CommonResponse {
    constructor(status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink) {

        super(status);
        this.payload = payload;
        this.totalPages = totalPages;
        this.prevPage = prevPage;
        this.nextPage = nextPage;
        this.page = page;
        this.hasPrevPage = hasPrevPage;
        this.hasNextPage = hasNextPage;
        this.prevLink = !hasPrevPage ? null : prevLink;
        this.nextLink = !hasNextPage ? null : nextLink;
    }
}