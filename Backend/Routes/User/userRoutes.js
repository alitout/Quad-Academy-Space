import express from 'express';
import UserController from '../../Controllers/User/userController.js';
import { verifyToken } from '../../Functions/auth.js';
const router = express.Router();

router.post('/addAdmin', verifyToken, UserController.addAdminUser);
router.post('/add', UserController.addUser);
router.patch('/update/:userID', verifyToken, UserController.updateUser);
router.post('/delete/Self/:userID', verifyToken, UserController.deleteSelfUser);
router.patch('/resetPassword/:userID', verifyToken, UserController.resetUserPassword);
router.post('/login', UserController.loginUser);
router.get('/getSelf', verifyToken, UserController.getSelfUser);
router.patch('/changePassword/:userID', verifyToken, UserController.changeUserPassword);
router.get('/getAll', UserController.getAllUsers);
router.delete('/delete/ByAdmin/:userID', verifyToken, UserController.deleteUserByAdmin);

export default router;