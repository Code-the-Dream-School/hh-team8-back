const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');


router.get('/projects', projectController.getAllProjects); // Endpoint to get all projects
router.get('/projects/:id', projectController.getProjectById); // Endpoint to get a specific project by ID
router.get('/dashboard', projectController.dashboard); // endpoint for getting total project, comments and users.
router.get('/projects/:id', projectController.getProjectById); // Endpoint to get a specific project by ID
router.get('/comments/:project_id', projectController.getCommentsByProjectId); // Endpoint to get all comments for a specific project 
router.get('/likes/:project_id', projectController.getLikesByProjectId); //Endpoint for get all likes for a specific project 
  
module.exports = router;