const express = require('express');
const UserController = require('../../Controllers/User/userController');
const router = express.Router();

router.post('/api/user/add', UserController.addUser);
router.put('/api/user/update/:userID', UserController.updateUser);
router.delete('/api/user/delete/:userID', UserController.deleteUser);
router.post('/api/user/login', UserController.loginUser);

module.exports = router;