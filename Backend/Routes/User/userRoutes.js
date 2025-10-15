import express from 'express';
import UserController from '../../Controllers/User/userController.js';
const router = express.Router();

router.post('/api/user/add', UserController.addUser);
router.patch('/api/user/update/:userID', UserController.updateUser);
router.delete('/api/user/delete/:userID', UserController.deleteUser);
router.post('/api/user/login', UserController.loginUser);
router.get('/api/user/getSelf', UserController.getSelfUser);

export default router;