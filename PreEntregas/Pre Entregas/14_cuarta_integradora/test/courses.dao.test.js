import mongoose from "mongoose";
import CoursesDao from "../src/services/db/dao/courses.dao.js";
import chai from "chai";

const expect = chai.expect;

describe('Pruebas del dao de cursos', () => {

    before(async function () {
        this.connection = await mongoose.connect("mongodb+srv://rivodsg:test@cluster0.aghviez.mongodb.net/");
        this.dao = new CoursesDao();

        this.course = null;
        this.courseID = null;
    });

    it("crear un curso", async function () {

        this.course = {
            "title": "javascript",
            "description": "curso unit test",
            "teacherName": "unit test"
        };

        const result = await this.dao.saveCourse(this.course);

        this.courseID = result._id;

        expect(result)
            .to.be.an('object')
            .that.have.a.property('title', this.course.title);

        expect(result)
            .to.have.a.property('_id');

    });

    it("se deben obtener todos los cursos", async function () {
        const result = await this.dao.getAll();

        expect(result)
            .to.be.an('array')
            .and.satisfies(courses => courses.some(course => course._id.toString() == this.courseID.toString()));
    });

    after(async function () {
        await this.dao.delete(this.courseID);
    });

});