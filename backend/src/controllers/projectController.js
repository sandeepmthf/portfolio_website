const Project = require("../models/Project");
const mongoose = require("mongoose");

// Mock projects data for demo mode
const MOCK_PROJECTS = [
  {
    _id: "1",
    title: "GharTak",
    description: "Platform connecting local vendors with customers to help small businesses expand digitally.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "JWT"],
    githubLink: "https://github.com/sandeepmthf/Ghar_tak",
    liveLink: "https://ghartak2.vercel.app/",
    image: "/project-logos/ghartak-logo.png",
    category: "Full Stack",
    featured: true,
  },
  {
    _id: "2",
    title: "GurukulTheInstitute",
    type: "Freelance Project",
    description: "A fully functional EdTech platform built as a paid freelance project with OTP authentication and admin/teacher panel.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind", "Cloud", "GoDaddy"],
    githubLink: "https://github.com/sandeepmthf/Gurukul-FullStack",
    liveLink: "https://www.gurukultheinstitute.in/",
    image: "/project-logos/gurukul-logo.png",
    category: "Full Stack",
    featured: false,
  },
  {
    _id: "3",
    title: "Jeevan Setu",
    type: "UI/UX Project",
    description: "A UI/UX mobile application prototype designed for Smart India Hackathon (SIH) focusing on user-centric design.",
    techStack: ["Figma", "UI/UX"],
    githubLink: "",
    liveLink: "https://www.figma.com/proto/JTZ5g5RDG84IxfhGqeCD5q/jeevansetu",
    image: "/project-logos/jeevansetu-logo.png",
    category: "UI/UX",
    featured: false,
  },
];

const parseFeatured = (value) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
};

const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    // Check if MongoDB is connected
    const isConnected = mongoose.connection.readyState === 1;
    
    let projects;
    
    if (!isConnected) {
      // Use mock data
      projects = MOCK_PROJECTS;
    } else {
      const query = {};
      if (category && category !== "All") {
        query.category = category;
      }
      const featuredValue = parseFeatured(featured);
      if (typeof featuredValue === "boolean") {
        query.featured = featuredValue;
      }
      projects = await Project.find(query).sort({ createdAt: -1 });
    }
    
    // Filter based on query params
    let result = projects;
    if (category && category !== "All") {
      result = result.filter(p => p.category === category);
    }
    const featuredValue = parseFeatured(featured);
    if (typeof featuredValue === "boolean") {
      result = result.filter(p => p.featured === featuredValue);
    }
    
    return res.status(200).json(result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching projects:", error);
    return res.status(500).json({ message: "Error fetching projects", details: error.message });
  }
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
