import express from 'express';
import ProgramsController from '../../Controllers/Program/programsController.js';
import { verifyToken, verifyAdmin } from '../../Functions/auth.js';

const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, ProgramsController.addProgram);
router.patch('/update/:programID', verifyToken, verifyAdmin, ProgramsController.updateProgram);
router.delete('/delete/:programID', verifyToken, verifyAdmin, ProgramsController.deleteProgram);
router.get('/getAll', ProgramsController.getAllPrograms);
router.get('/getByID/:programID', ProgramsController.getProgramByID);

export default router;
