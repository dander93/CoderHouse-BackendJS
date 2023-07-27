import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080/api/products');

describe('Tests del router Product', async function () {

    before(function () {
        this.productCreatedID = null;
    });

    it('Los productos mockeados deben ser 100 y el status code debe ser 200', async function () {

        const { statusCode, body } = await requester.get('/mockingproducts');

        expect(statusCode).to.be.ok;
        expect(body.payload).to.be.an('array').to.have.lengthOf(100);
    });

    it('Se debe crear un producto y el statuscode debe ser 201', async function () {

        const product = {
            "title": "producto",
            "description": "descripcion prueba socket",
            "code": "code4",
            "price": 123.4,
            "stock": 34,
            "category": "category1",
            "thumbnails": [
                "https://placekitten.com/100/150",
                "sdfg",
                "xcvbgc"
            ]
        };

        const { statusCode, body } =
            await requester
                .post('/')
                .send(product);

        this.productCreatedID = body._id;

        expect(statusCode).to.be.equal(201);
        expect(body).to.be.an('object').and.have.property('_id');
    });

    it('Se debe eliminar el producto creado en el test anterior. El status code debe ser 200 y se debe obtener el producto eliminado.', async function () {

        const { statusCode, body } =
            await requester
                .delete(`/${this.productCreatedID}`);

        expect(statusCode).to.be.ok;
        expect(body).to.have.property('_id').and.to.be.equal(this.productCreatedID);
    });

});