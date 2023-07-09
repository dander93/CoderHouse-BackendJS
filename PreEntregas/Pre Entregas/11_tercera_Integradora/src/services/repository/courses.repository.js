export default class CourseRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getAll = () => {
        return this.dao.getAll();
    };
    getBy = (params) => {
        return this.dao.getById(params);
    };
    createCourse = (course) => {
        return this.dao.saveCourse(course);
    };
    update = (id, course) => {
        return this.dao.updateCourse(id, course);
    };
};