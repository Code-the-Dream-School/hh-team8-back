const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const projectModel = {

    dashboard: async () => {
        try {
            // Count the total number of projects
            const projectsCount = await prisma.projects.count();
        
            // Count the total number of users
            const usersCount = await prisma.users.count();
        
            // Count the total number of comments
            const commentsCount = await prisma.comments.count();
        
            return {
              projects: projectsCount,
              users: usersCount,
              comments: commentsCount,
            };
          } catch (error) {
            console.error("Error fetching counts:", error);
            throw error;
          } finally {
            await prisma.$disconnect();
          }
    },

    getAllProjects: async () => {
        try {
            console.log("Fetching all projects...");
            const projects = await prisma.projects.findMany(); 
            return projects;
        } catch (error) {
            console.error("Error while fetching projects:", error);
            throw new Error(`Failed to retrieve projects: ${error.message}`);
        }
    },

    getProjectById: async (id) => {
        try {
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

    addProject: async (projectData) => {
        try {
            const newProject = await prisma.projects.create({
                data: {
                    name: projectData.name,
                    description: projectData.description,
                    github_link: projectData.github_link,
                    youtube_video_link: projectData.youtube_video_link,
                    is_public: projectData.is_public || true, 
                    created_by: projectData.user_id,
                    tags: projectData.tags, 
                },
            });

            return newProject;
        } catch (error) {
            console.error("Error while adding new project:", error);
            throw new Error(`Failed to add project: ${error.message}`);
        }
    },

    updateProject: async (userId, projectId, updateData) => {
        try {
            const project = await prisma.projects.findUnique({
                where: { project_id: projectId },
            });
    
            if (!project) {
                throw new Error(`Project with ID ${projectId} not found.`);
            }
    
            if (project.created_by !== userId) {
                throw new Error("You are not authorized to update this project.");
            }
    
            const updatedProject = await prisma.projects.update({
                where: { project_id: projectId },
                data: updateData,
            });
    
            return updatedProject;
        } catch (error) {
            console.error("Error while updating project:", error);
            throw new Error(`Failed to update project: ${error.message}`);
        }
    },

    getProjectsByUser: async (userId) => {
        try {
            const projects = await prisma.projects.findMany({
                where: { created_by: userId },
            });

            return projects;
        } catch (error) {
            console.error(`Error fetching projects for user ID ${userId}:`, error);
            throw new Error(`Failed to retrieve projects: ${error.message}`);
        }
    },

    addComment: async (projectId, commentContent, userId) => {
        try {
          const comment = await prisma.comments.create({
            data: {
              content: commentContent,
              user_id: userId,
              project_id: projectId,
            },
          });
    
          return comment;
        } catch (error) {
          console.error("Error while adding comment:", error);
          throw new Error(`Failed to add comment: ${error.message}`);
        }
      },


  getCommentsByProjectId: async (projectId) => {
    try {
      const comments = await prisma.comments.findMany({
        where: { project_id: projectId },
        include: {
          users: {
            select: {
              user_id: true,
              username: true, 
            },
          },
        },
      });

      return comments;
    } catch (error) {
      console.error("Error while fetching comments:", error);
      throw new Error(`Failed to fetch comments: ${error.message}`);
    }
  },

  deleteProject: async (userId, projectId) => {
    try {
        const project = await prisma.projects.findUnique({
            where: { project_id: projectId },
        });

        if (!project) {
            throw new Error(`Project with ID ${projectId} not found.`);
        }

        if (project.created_by !== userId) {
            throw new Error(`You are not authorized to delete this project.`);
        }
        await prisma.projects.delete({
            where: { project_id: projectId },
        });
        return { success: true, message: "Project deleted successfully." };
    } catch (error) {
        console.error("Error while deleting project:", error);
        throw new Error(`Failed to delete project: ${error.message}`);
    }
  },

  addLike: async (userId, projectId) => {
    try {
        const newLike = await prisma.likes.create({
            data: {
                user_id: userId,
                project_id: projectId,
            },
        });
        return newLike;
    } catch (error) {
        console.error("Error while adding like:", error);
        if (error.code === "P2002") {
            throw new Error("User has already liked this project.");
        }
        throw new Error(`Failed to add like: ${error.message}`);
    }
  },


  removeLike: async (userId, projectId) => {
    try {
        const deletedLike = await prisma.likes.deleteMany({
            where: {
                user_id: userId,
                project_id: projectId,
            },
        });
        return deletedLike.count > 0;
    } catch (error) {
        console.error("Error while removing like:", error);
        throw new Error(`Failed to remove like: ${error.message}`);
    }
  },

  getLikesByProjectId: async (projectId) => {
    try {
        const likes = await prisma.likes.findMany({
            where: { project_id: projectId },
            include: {
                users: {
                    select: {
                        user_id: true,
                        username: true, 
                    },
                },
            },
        });
        return likes;
    } catch (error) {
        console.error("Error while fetching likes:", error);
        throw new Error(`Failed to retrieve likes: ${error.message}`);
    }
  },

};

module.exports = projectModel;