import express from 'express';
import MasterClassController from '../../Controllers/MasterClass/MasterClassController.js';
import { verifyToken } from '../../Functions/auth.js';

const router = express.Router();

router.post('/add', verifyToken, MasterClassController.addMasterClass);
router.patch('/update/:masterClassID', verifyToken, MasterClassController.updateMasterClass);
router.delete('/delete/:masterClassID', verifyToken, MasterClassController.deleteMasterClass);
router.get('/getAll', MasterClassController.getAllMasterClasses);
router.get('/getByID/:masterClassID', MasterClassController.getMasterClassByID);

export default router;
