

import chai from 'chai';
import supertest from 'supertest';
import { randomUUID } from 'crypto';

const expect = chai.expect;
const requester = supertest("http://localhost:8080/");


/*

Se deben incluir por lo menos 3 tests desarrollados para
Router de products.
Router de carts.
Router de sessions.
NO desarrollar únicamente tests de status, la idea es trabajar lo mejor desarrollado posible las validaciones de testing

*/

describe('Test del router User', function () {

    before(function () {
        this.user =
        {
            "firstName": "nombre",
            "lastName": "apellido",
            "age": "28",
            "email": `${randomUUID()}@a.com`,
            "password": "a"
        };
    });

    it('Registrar usuario', async function () {

        const { statusCode, body } =
            await requester
                .post('register')
                .send(this.user);

        expect(statusCode).to.be.equal(201);
        expect(body).to.have.property('status').equal('success');
    });

    it('El login debe fallar', async function () {
        const { statusCode, headers, body, ...rest } =
            await requester
                .post('login')
                .send({
                    email: this.user.email,
                    password: 'password'
                });


        expect(statusCode).to.be.equal(302);
        expect(headers).to.have.property('location', '/login');
    });

    it('Login de usuario', async function () {
        const { statusCode, headers } =
            await requester
                .post('login')
                .send({
                    email: this.user.email,
                    password: this.user.password
                });

        expect(statusCode).to.be.equal(302);
        expect(headers).to.have.property('location', '/products');
    });

    it('Se debe desloguear el usuario logueado correctamente', async function () {
        const { statusCode, headers, body, ...rest } =
            await requester.get('logout');

        expect(statusCode).to.be.equal(302);
        expect(headers).to.have.property('location', '/login');
    });

});
