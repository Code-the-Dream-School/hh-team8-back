const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.getAllUsers); // Endpoint to get all users

router.get('/userinfo/:id', userController.getUserInfoById); // Endpoint to get user information by ID
router.post('/adduser', userController.addUser); // Endpoint to add a new user
router.get('/user/login', userController.getUserByCredentials); // Endpoint to log in a user
router.put('/updaterole', userController.updateUserRole); // Endpoint to update a user's role
router.delete('/deleteuser/:user_id', userController.deleteUser); // Endpoint to delete a user

module.exports = router;

