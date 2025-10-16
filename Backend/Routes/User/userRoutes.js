import express from 'express';
import UserController from '../../Controllers/User/userController.js';
import { verifyToken } from '../../Functions/auth.js';
const router = express.Router();

router.post('/add', UserController.addUser);
router.patch('/update/:userID', verifyToken, UserController.updateUser);
router.delete('/delete/:userID', verifyToken, UserController.deleteUser);
router.post('/login', UserController.loginUser);
router.get('/getSelf', verifyToken, UserController.getSelfUser);

export default router;