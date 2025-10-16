import express from 'express';
import UserController from '../../Controllers/User/userController.js';
import { verifyToken } from '../../Functions/auth.js';
const router = express.Router();

router.post('/add', UserController.addUser);
router.patch('/update/:userID', verifyToken, UserController.updateUser);
router.post('/delete/:userID', verifyToken, UserController.deleteUser);
router.post('/login', UserController.loginUser);
router.get('/getSelf', verifyToken, UserController.getSelfUser);
router.patch('/changePassword/:userID', verifyToken, UserController.changeUserPassword);

export default router;