export default class QueryParamsHelper {



    getValidProductQueryFilters(query) {

        // const { id, title, description, price, stock, code, category, status, ...rest } = query;


        // const retValue = {
        //     id: id,
        //     title: title,
        //     description: description,
        //     price: price,
        //     stock: stock,
        //     code: code,
        //     category: category,
        //     status: status
        // }

        const { category, status, ...rest } = query;

        const retValue = { category: category, status: status }

        return Object.values(retValue).some(prop => prop) ?
            this.#sanitizedQueryToMongooseFilter(this.#removeEmptyProperties(retValue)) :
            {};
    }


    #removeEmptyProperties(query) {
        const sanitizedQuery =
            Object.fromEntries(
                Object.entries(query).filter(
                    ([_, propValue]) => propValue != null));

        return sanitizedQuery;
    }

    #sanitizedQueryToMongooseFilter(query) {
        return Object.keys(query).length > 1 ?
            { "$or": [{ 'category': query.category }, { 'status': query.status }] } :
            query;
    }
}   