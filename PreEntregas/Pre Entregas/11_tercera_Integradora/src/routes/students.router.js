import { addLogger } from '../config/logger.js';
import { getAllStudents, createStudent } from '../controller/student.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/', addLogger, getAllStudents);

router.post('/', addLogger, createStudent);

export default router;