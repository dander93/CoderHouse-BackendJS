import Students from "../db/dao/students.dao.js";
import Courses from "../db/dao/courses.dao.js";
import CourseRepository from "./courses.repository.js";
import StudentRepository from "./students.repository.js";

const studentDao = new Students();
const courseDao = new Courses();

export const studentService = new StudentRepository(studentDao);
export const coursesService = new CourseRepository(courseDao);