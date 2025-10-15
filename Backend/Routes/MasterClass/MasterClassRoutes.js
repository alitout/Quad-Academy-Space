import express from 'express';
import MasterClassController from '../../Controllers/MasterClass/MasterClassController.js';

const router = express.Router();

router.post('/api/masterclasses/add', MasterClassController.addMasterClass);
router.patch('/api/masterclasses/update/:masterClassID', MasterClassController.updateMasterClass);
router.delete('/api/masterclasses/delete/:masterClassID', MasterClassController.deleteMasterClass);
router.get('/api/masterclasses/getAll', MasterClassController.getAllMasterClasses);
router.get('/api/masterclasses/getByID/:masterClassID', MasterClassController.getMasterClassByID);

export default router;
