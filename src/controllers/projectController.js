const projectModel = require("../models/projectModel");

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
      const projectId = parseInt(req.params.id, 10);
      const project = await projectModel.getProjectById(projectId);
      res.status(200).json({ success: true, data: project });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  },


  addProject: async (req, res) => {
    try {
      const { user_id } = req.params;
      const {
        name,
        description,
        github_link,
        youtube_video_link,
        is_public,
        tags,
      } = req.body;

      if (!name || !description || !tags) {
        return res.status(400).json({
          success: false,
          message: "All fields (name, description, tags) are required.",
        });
      }

      const tagsArray = Array.isArray(tags)
        ? tags
        : tags.split(",").map((tag) => tag.trim());

      const projectData = {
        user_id: parseInt(user_id, 10),
        name,
        description,
        github_link,
        youtube_video_link,
        is_public: is_public || true,
        tags: tagsArray, 
      };
      const newProject = await projectModel.addProject(projectData);

      res.status(201).json({
        success: true,
        message: "Project added successfully.",
        data: newProject,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

      console.error(`Failed to add project: ${error.message}`);
    }
  },


  updateProject: async (req, res) => {
    try {
      const { user_id, project_id } = req.params; 
      const {
        name,
        description,
        github_link,
        youtube_video_link,
        is_public,
        tags,
      } = req.body;

      if (!user_id || !project_id) {
        return res.status(400).json({
          success: false,
          message: "Both user_id and project_id are required.",
        });
      }

      const tagsArray = Array.isArray(tags)
        ? tags
        : tags?.split(",").map((tag) => tag.trim());

      const updateData = {
        name: name !== undefined ? name : undefined,
        description: description !== undefined ? description : undefined,
        github_link: github_link !== undefined ? github_link : undefined,
        youtube_video_link:
          youtube_video_link !== undefined ? youtube_video_link : undefined,
        is_public: is_public !== undefined ? is_public : undefined,
        tags: tagsArray !== undefined ? tagsArray : undefined,
      };

      await projectModel.updateProject(
        parseInt(user_id, 10),
        parseInt(project_id, 10),
        updateData
      );

      res.status(200).json({
        success: true,
        message: "Project updated successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

      console.error(`Failed to update project: ${error.message}`);
    }
  },


  getProjectsByUser: async (req, res) => {
    try {
      const { user_id } = req.params; 

      if (!user_id) {
        return res.status(400).json({
          success: false,
          message: "User ID is required.",
        });
      }

      const userProjects = await projectModel.getProjectsByUser(
        parseInt(user_id, 10)
      );

      res.status(200).json({
        success: true,
        message: "Projects retrieved successfully.",
        data: userProjects,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: `Failed to retrieve projects: ${error.message}`,
      });

      console.error(
        `Error fetching projects for user ID ${req.params.user_id}: ${error.message}`
      );
    }
  },


  addComment: async (req, res) => {
    try {
      const { project_id } = req.params;
      const { comment_content, user_id } = req.body;

      if (!project_id || !comment_content || !user_id) {
        return res.status(400).json({
          success: false,
          message: "project_id, comment_content, and user_id are required.",
        });
      }

      const comment = await projectModel.addComment(
        parseInt(project_id, 10),
        comment_content,
        parseInt(user_id, 10)
      );

      res.status(200).json({
        success: true,
        message: "Comment added successfully.",
        data: comment,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

      console.error(`Failed to add comment: ${error.message}`);
    }
  },


  getCommentsByProjectId: async (req, res) => {
    try {
      const { project_id } = req.params;
      if (!project_id) {
        return res.status(400).json({
          success: false,
          message: "project_id is required.",
        });
      }

      const comments = await projectModel.getCommentsByProjectId(
        parseInt(project_id, 10)
      );

      res.status(200).json({
        success: true,
        data: comments,
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

      console.error(`Failed to fetch comments: ${error.message}`);
    }
  },


  deleteProject: async (req, res) => {
    try {
      const { user_id, project_id } = req.params; 

      if (!user_id || !project_id) {
        return res.status(400).json({
          success: false,
          message: "Both user_id and project_id are required.",
        });
      }

      const result = await projectModel.deleteProject(
        parseInt(user_id, 10),
        parseInt(project_id, 10)
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });

      console.error(`Failed to delete project: ${error.message}`);
    }
  },


  addLike: async (req, res) => {
    try {
        const { user_id, project_id } = req.params;
        if (!user_id || !project_id) {
            return res.status(400).json({
                success: false,
                message: "Both user_id and project_id are required.",
            });
        }
        const newLike = await projectModel.addLike(parseInt(user_id, 10), parseInt(project_id, 10));
        res.status(200).json({
            success: true,
            message: "Like added successfully.",
            data: newLike,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to add like: ${error.message}`,
        });
        console.error(`Failed to add like: ${error.message}`);
    }
  },

  removeLike: async (req, res) => {
    try {
        const { user_id, project_id } = req.params; 
        if (!user_id || !project_id) {
            return res.status(400).json({
                success: false,
                message: "Both user_id and project_id are required.",
            });
        }
        const result = await projectModel.removeLike(parseInt(user_id, 10), parseInt(project_id, 10));
        if (result) {
            res.status(200).json({
                success: true,
                message: "Like removed successfully.",
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Like not found.",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to remove like: ${error.message}`,
        });
        console.error(`Failed to remove like: ${error.message}`);
    }
  },

  getLikesByProjectId: async (req, res) => {
    try {
        const { project_id } = req.params;
        if (!project_id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required.",
            });
        }
        const likes = await projectModel.getLikesByProjectId(parseInt(project_id, 10));
        res.status(200).json({
            success: true,
            data: likes,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Failed to retrieve likes: ${error.message}`,
        });

        console.error(`Failed to retrieve likes for project ID ${project_id}: ${error.message}`);
    }
  },
  
};


module.exports = projectController;
