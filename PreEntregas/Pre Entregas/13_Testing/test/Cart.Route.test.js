import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest("http://localhost:8080/api/carts");

/*

Se deben incluir por lo menos 3 tests desarrollados para
Router de products.
Router de carts.
Router de sessions.
NO desarrollar únicamente tests de status, la idea es trabajar lo mejor desarrollado posible las validaciones de testing

*/

describe('Test del router Cart', function () {

    before(function () {
        this.cartID = null;
        this.productIDInCart = null;
    });

    it('Se debe crear un carrito', async function () {
        const { statusCode, body } = await requester.post('/');

        this.cartID = body.message.split(':')[1].trim();

        expect(statusCode)
            .to.be.ok;

        expect(body)
            .to.have.a.property('message').that.exist
            .and.to.contain(this.cartID);
    });

    it('Se debe agregar un producto al carrito', async function () {

        const product = { "title": "producto", "description": "descripcion prueba socket", "code": "code4", "price": 123.4, "stock": 34, "category": "category1", "thumbnails": ["https://placekitten.com/100/150", "sdfg", "xcvbgc"] };

        const { body: { _id: productID } } = await supertest('http://localhost:8080/api/products').post('/').send(product);

        this.productIDInCart = productID;

        const { statusCode, body } = await requester.post(`/${this.cartID}/product/${productID}`);

        expect(statusCode)
            .to.be.ok;

        expect(body)
            .to.have.a.property('message')
            .and.contain(`${this.cartID}`)
            .and.contain(`${productID}`);

    });

    it('Se deben eliminar todos los productos del carrito', async function () {


        const { statusCode, body } = await requester.delete(`/${this.cartID}`);

        expect(statusCode)
            .to.be.ok;

        expect(body)
            .to.have.property('id').equals(this.cartID);

        expect(body).to.have.property('products').that.is.an('array')
            .and.to.satisfy(products => {
                return products.some(product => product.productID === this.productIDInCart && product.quantity > 0);
            });

    });


});