const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById); // New endpoint for user by ID
router.post('/addusers', userController.addUser); // New endpoint for adding a user

console.log('UserRouter initialized!');

module.exports = router;
