const projectModel = require('../models/projectModel');

const projectController = {
    getAllProjects: async (req, res) => {
        try {
            const projects = await projectModel.getAllProjects();
            res.status(200).json({ success: true, data: projects });
            console.log("Fetching all projects...");
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    getProjectById: async (req, res) => {
        try {
            const projectId = parseInt(req.params.id, 10); // Ensure the ID is a number
            const project = await projectModel.getProjectById(projectId);
            res.status(200).json({ success: true, data: project });
            console.log(`Fetching project with ID: ${projectId}`);
        } catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    },
};

module.exports = projectController;