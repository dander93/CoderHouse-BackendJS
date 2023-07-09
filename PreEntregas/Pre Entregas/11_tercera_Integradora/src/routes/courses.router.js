import { Router } from 'express';
import { createCourse, getAllCourses } from '../controller/course.controller.js';
import { addLogger } from '../config/logger.js';

const router = Router();

router.get('/', addLogger, getAllCourses);

router.post('/', addLogger, createCourse);

export default router;