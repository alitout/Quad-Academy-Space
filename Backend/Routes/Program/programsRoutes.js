import express from 'express';
import ProgramsController from '../../Controllers/Program/programsController.js';

const router = express.Router();

router.post('/api/programs/add', ProgramsController.addProgram);
router.patch('/api/programs/update/:programID', ProgramsController.updateProgram);
router.delete('/api/programs/delete/:programID', ProgramsController.deleteProgram);
router.get('/api/programs/getAll', ProgramsController.getAllPrograms);
router.get('/api/programs/getByID/:programID', ProgramsController.getProgramByID);

export default router;
