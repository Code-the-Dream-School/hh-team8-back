const request = require("supertest");
const express = require("express");
const projectController = require("../controllers/projectController");
const projectModel = require("../models/projectModel");

jest.mock("../models/projectModel");

const app = express();
app.use(express.json());

// Mock routes to test controller methods
app.get("/projects", projectController.getAllProjects);
app.get("/projects/:id", projectController.getProjectById);
app.post("/projects/:user_id", projectController.addProject);
app.put("/projects/:user_id/:project_id", projectController.updateProject);
app.get("/projects/user/:user_id", projectController.getProjectsByUser);
app.post("/projects/:project_id/comments", projectController.addComment);
app.get("/projects/:project_id/comments", projectController.getCommentsByProjectId);
app.delete("/projects/:user_id/:project_id", projectController.deleteProject);
app.post("/projects/:user_id/:project_id/like", projectController.addLike);
app.delete("/projects/:user_id/:project_id/like", projectController.removeLike);
app.get("/projects/:project_id/likes", projectController.getLikesByProjectId);

describe("Project Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all projects", async () => {
    projectModel.getAllProjects.mockResolvedValue([{ id: 1, name: "Test Project" }]);
    const res = await request(app).get("/projects");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(projectModel.getAllProjects).toHaveBeenCalledTimes(1);
  });

  it("should fetch a project by ID", async () => {
    projectModel.getProjectById.mockResolvedValue({ id: 1, name: "Test Project" });
    const res = await request(app).get("/projects/1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual({ id: 1, name: "Test Project" });
    expect(projectModel.getProjectById).toHaveBeenCalledWith(1);
  });

  it("should add a project", async () => {
    const newProject = { id: 1, name: "New Project" };
    projectModel.addProject.mockResolvedValue(newProject);
    const res = await request(app)
      .post("/projects/1")
      .send({ name: "New Project", description: "A test project", tags: "test" });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(projectModel.addProject).toHaveBeenCalled();
  });

  it("should update a project", async () => {
    projectModel.updateProject.mockResolvedValue();
    const res = await request(app)
      .put("/projects/1/2")
      .send({ name: "Updated Project" });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Project updated successfully.");
    expect(projectModel.updateProject).toHaveBeenCalledWith(1, 2, { name: "Updated Project" });
  });

  it("should fetch projects by user ID", async () => {
    projectModel.getProjectsByUser.mockResolvedValue([{ id: 1, name: "User Project" }]);
    const res = await request(app).get("/projects/user/1");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([{ id: 1, name: "User Project" }]);
    expect(projectModel.getProjectsByUser).toHaveBeenCalledWith(1);
  });

  it("should add a comment", async () => {
    const comment = { id: 1, content: "Great project!" };
    projectModel.addComment.mockResolvedValue(comment);
    const res = await request(app)
      .post("/projects/1/comments")
      .send({ comment_content: "Great project!", user_id: 1 });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Comment added successfully.");
    expect(projectModel.addComment).toHaveBeenCalledWith(1, "Great project!", 1);
  });

  it("should fetch comments by project ID", async () => {
    projectModel.getCommentsByProjectId.mockResolvedValue([
      { id: 1, content: "Great project!" },
    ]);
    const res = await request(app).get("/projects/1/comments");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([{ id: 1, content: "Great project!" }]);
    expect(projectModel.getCommentsByProjectId).toHaveBeenCalledWith(1);
  });

  it("should delete a project", async () => {
    projectModel.deleteProject.mockResolvedValue({ success: true });
    const res = await request(app).delete("/projects/1/2");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(projectModel.deleteProject).toHaveBeenCalledWith(1, 2);
  });

  it("should add a like", async () => {
    const like = { id: 1, user_id: 1, project_id: 2 };
    projectModel.addLike.mockResolvedValue(like);
    const res = await request(app).post("/projects/1/2/like");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Like added successfully.");
    expect(projectModel.addLike).toHaveBeenCalledWith(1, 2);
  });

  it("should remove a like", async () => {
    projectModel.removeLike.mockResolvedValue(true);
    const res = await request(app).delete("/projects/1/2/like");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Like removed successfully.");
    expect(projectModel.removeLike).toHaveBeenCalledWith(1, 2);
  });

  it("should fetch likes by project ID", async () => {
    projectModel.getLikesByProjectId.mockResolvedValue([{ id: 1, user_id: 1 }]);
    const res = await request(app).get("/projects/1/likes");
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([{ id: 1, user_id: 1 }]);
    expect(projectModel.getLikesByProjectId).toHaveBeenCalledWith(1);
  });
});