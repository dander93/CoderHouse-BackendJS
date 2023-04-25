export default class GetProductResponse {
    constructor(status, payload, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink) {

        this.status = status;
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