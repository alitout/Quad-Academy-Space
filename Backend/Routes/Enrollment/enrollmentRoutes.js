import express from 'express';
import EnrollmentController from '../../Controllers/Enrollment/enrollmentController.js';
import { verifyToken } from '../../Functions/auth.js';
const router = express.Router();

// Program enrollment routes
router.post('/program/enroll', verifyToken, EnrollmentController.enrollInProgram);
router.post('/program/unenroll', verifyToken, EnrollmentController.unenrollFromProgram);

// MasterClass enrollment routes
router.post('/masterclass/enroll', verifyToken, EnrollmentController.enrollInMasterClass);
router.post('/masterclass/unenroll', verifyToken, EnrollmentController.unenrollFromMasterClass);

// Get user enrollments
router.get('/user', verifyToken, EnrollmentController.getUserEnrollments);

export default router;