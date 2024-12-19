const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projectModel = {
    getAllProjects: async () => {
        try {
            console.log("Fetching all projects...");
            const projects = await prisma.projects.findMany(); // Fetch all projects
            console.log("Projects fetched:", projects);
            return projects;
        } catch (error) {
            console.error("Error while fetching projects:", error);
            throw new Error(`Failed to retrieve projects: ${error.message}`);
        }
    },
    getProjectById: async (id) => {
        try {
            console.log(`Fetching project with ID: ${id}`);
            const project = await prisma.projects.findUnique({
                where: { project_id: id },
            });
            if (!project) {
                throw new Error(`Project with ID ${id} not found`);
            }
            console.log("Project fetched:", project);
            return project;
        } catch (error) {
            console.error("Error while fetching project by ID:", error);
            throw new Error(`Failed to retrieve project: ${error.message}`);
        }
    },
};

module.exports = projectModel;