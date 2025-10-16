import express from 'express';
import ProgramsController from '../../Controllers/Program/programsController.js';
import { verifyToken } from '../../Functions/auth.js';

const router = express.Router();

router.post('/add', verifyToken, ProgramsController.addProgram);
router.patch('/update/:programID', verifyToken, ProgramsController.updateProgram);
router.delete('/delete/:programID', verifyToken, ProgramsController.deleteProgram);
router.get('/getAll', ProgramsController.getAllPrograms);
router.get('/getByID/:programID', ProgramsController.getProgramByID);

export default router;
