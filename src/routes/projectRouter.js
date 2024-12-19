const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects', projectController.getAllProjects); // Endpoint to get all projects
router.get('/projects/:id', projectController.getProjectById); // Endpoint to get a specific project by ID

console.log('ProjectRouter initialized!');

module.exports = router;