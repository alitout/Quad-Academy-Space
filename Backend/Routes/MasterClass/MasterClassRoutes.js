import express from 'express';
import MasterClassController from '../../Controllers/MasterClass/MasterClassController.js';
import { verifyToken, verifyAdmin } from '../../Functions/auth.js';

const router = express.Router();

router.post('/add', verifyToken, verifyAdmin, MasterClassController.addMasterClass);
router.patch('/update/:masterClassID', verifyToken, verifyAdmin, MasterClassController.updateMasterClass);
router.delete('/delete/:masterClassID', verifyToken, verifyAdmin, MasterClassController.deleteMasterClass);
router.get('/getAll', MasterClassController.getAllMasterClasses);
router.get('/getByID/:masterClassID', MasterClassController.getMasterClassByID);

export default router;
