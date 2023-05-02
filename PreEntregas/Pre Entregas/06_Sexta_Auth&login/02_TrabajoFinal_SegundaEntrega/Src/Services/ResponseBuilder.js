import ResponseTypes from '../Models/Enums/ResponseTypeEnum.js'
import GetProductResponse from '../Models/Response/GetProductResponse.js';

export default class ResponseBuilder {

    #request;
    #baseLink;

    constructor(responseType, request) {
        this.responseType = responseType;
        this.#request = request;


        this.#buildBaseLink();
    }


    #getResponseType() {
        switch (this.responseType) {
            case ResponseTypes.GetProducts: return GetProductResponse
            default:
                throw new Error("Tipo de respuesta no válido")
        }
    }

    buildResponse(data) {

        const responseType = this.#getResponseType();

        switch (this.responseType) {
            case ResponseTypes.GetProducts:

                const { status, docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = data;
                const { sort, limit, query } = this.#request.query;

                return new responseType(
                    status,
                    docs,
                    totalPages,
                    prevPage,
                    nextPage,
                    page,
                    hasPrevPage,
                    hasNextPage,
                    this.#buildPrevLink(hasPrevPage, sort, limit, page, query),
                    this.#buildNextLink(hasNextPage, sort, limit, page, query))

            default:
                throw new Error("Tipo de respuesta no válido")

        }
    }

    #buildBaseLink() {
        this.#baseLink = new URL(`${this.#request.protocol}://${this.#request.headers.host}${this.#request.originalUrl.split('?').shift()}`);
    }

    #buildPrevLink(hasPrevPage, sort, limit, page, query) {

        if (hasPrevPage) {
            const prevLink = new URL(this.#baseLink.toString());

            prevLink.searchParams.append("page", page - 1);
            prevLink.searchParams.append("limit", limit);

            if (sort) {
                prevLink.searchParams.append("sort", sort)
            }

            if (query) {
                prevLink.searchParams.append("query", query)
            }

            return prevLink.toString();
        }

        return null;
    }

    #buildNextLink(hasNextPage, sort, limit, page, query) {

        if(hasNextPage){

            const nextLink = new URL(this.#baseLink.toString());

            nextLink.searchParams.append("page", page + 1);
            nextLink.searchParams.append("limit", limit);

            if (sort) {
                nextLink.searchParams.append("sort", sort)
            }

            if (query) {
                nextLink.searchParams.append("query", query)
            }

            //page +1
            return nextLink.toString();
        }

        return null;
    }


}