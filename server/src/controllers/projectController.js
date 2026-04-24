const Project = require("../models/Project");

const parseFeatured = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

const getProjects = async (req, res) => {
  const { category, featured } = req.query;
  const query = {};

  if (category && category !== "All") {
    query.category = category;
  }

  const featuredValue = parseFeatured(featured);
  if (typeof featuredValue === "boolean") {
    query.featured = featuredValue;
  }

  const projects = await Project.find(query).sort({ createdAt: -1 });
  return res.status(200).json(projects);
};

const createProject = async (req, res) => {
  const payload = req.body;
  const project = await Project.create(payload);
  return res.status(201).json(project);
};

const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.status(200).json(project);
};

const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  return res.status(200).json({ message: "Project deleted" });
};

module.exports = { getProjects, createProject, updateProject, deleteProject };
