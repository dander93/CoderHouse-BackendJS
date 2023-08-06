import StudentServiceDao from '../src/services/db/dao/students.dao.js';
import CoursesDao from '../src/services/db/dao/courses.dao.js';
import mongoose from 'mongoose';
import supertest from 'supertest';
import chai from 'chai';

const expect = chai.expect;

const requester = supertest("http://localhost:9090");

describe("Testing App Api Endpoints.", () => {
    describe("Testing Students Api", () => {

        before(async function () {

            this.connection = await mongoose.connect("mongodb+srv://rivodsg:test@cluster0.aghviez.mongodb.net/");
            this.dao = new StudentServiceDao();

            this.student = {
                "name": "unit",
                "lastName": "test",
                "email": "unit@test.com",
                "age": "12",
                "password": "test",
                "role": "admin",
                "courses": [
                    {
                        "course": "64a74d740c0007c997da8f0f"
                    },
                    {
                        "course": "64ced894393af303ead2fcd8"
                    }
                ]
            };

            this.studentResult = null;
        });

        it("prueba para crear un estudiante", async function () {
            const { statusCode, body } = await requester.post('/api/students').send(this.student);

            this.studentResult = body;

            expect(statusCode)
                .to.equal(201);
        });

        it("prueba obtener todos los estudiantes", async function () {
            const { statusCode, body } = await requester.get("/api/students");

            expect(statusCode)
                .to.be.ok;

            expect(body)
                .to.be.an('array')
                .and.satisfies(students => students.some(student => student._id.toString() == this.studentResult._id.toString()));
        });

        after(async function () {
            await this.dao.delete(this.studentResult._id);
        });
    });

    describe("Testing Courses Api", () => {

        before(async function () {
            this.connection = await mongoose.connect("mongodb+srv://rivodsg:test@cluster0.aghviez.mongodb.net/");
            this.dao = new CoursesDao();

            this.course = {
                "title": "javascript",
                "description": "curso unit test",
                "teacherName": "unit test"
            };

            this.courseResult = null;
        });

        it("prueba para crear un curso", async function () {

            const { statusCode, body } = await requester.post('/api/courses').send(this.course);

            this.courseResult = body;

            expect(statusCode)
                .to.be.equal(201);
        });

        it("prueba para obtener todos los cursos", async function () {

            const { statusCode, body } = await requester.get('/api/courses');

            expect(statusCode)
                .to.be.ok;

            expect(body)
                .to.be.an('array')
                .and.satisfies(courses => courses.some(course => course._id.toString() == this.courseResult._id.toString()));
        });

        after(async function () {
            await this.dao.delete(this.courseResult._id);
        });
    });
});