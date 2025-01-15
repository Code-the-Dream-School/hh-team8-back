const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/projects', projectController.getAllProjects); // Endpoint to get all projects
router.get('/projects/:id', projectController.getProjectById); // Endpoint to get a specific project by ID
router.post('/addproject', projectController.addProject); // Endpoint to add a new project
router.put('/updateproject/:project_id', projectController.updateProject); // Endpoint to update a project
router.get('/userprojects/', projectController.getProjectsByUser); // Endpoint to get all projects by a specific user
router.post('/addcomment/:project_id', projectController.addComment); // Endpoint to add a comment to a project
router.get('/comments/:project_id', projectController.getCommentsByProjectId); // Endpoint to get all comments for a specific project
router.delete("/deleteproject/:project_id", projectController.deleteProject); // Endpoint to delete a project
router.post('/addlike/:project_id', projectController.addLike); // Endpoint to add a like to a project
router.delete('/removelike/:project_id', projectController.removeLike); // Endpoint to delete a like from the project
router.get('/likes/:project_id', projectController.getLikesByProjectId); //Endpoint for get all likes for a specific project 

module.exports = router;