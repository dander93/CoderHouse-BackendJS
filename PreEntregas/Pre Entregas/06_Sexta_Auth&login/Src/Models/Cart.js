export default class Cart {

    constructor(id) {
        try {
            this.products = [];
            this.id = id;
        }
        catch (error) {
            throw error;
        }
    }

}