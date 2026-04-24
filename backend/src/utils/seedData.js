const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Project = require("../models/Project");
const Certificate = require("../models/Certificate");
const Resume = require("../models/Resume");

const initialProjects = [
  {
    title: "GharTak",
    description:
      "Platform connecting local vendors with customers to help small businesses expand digitally.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind", "JWT"],
    githubLink: "https://github.com/sandeepmthf/Ghar_tak",
    liveLink: "https://ghartak2.vercel.app/",
    image: "/project-logos/ghartak-logo.png",
    category: "Full Stack",
    featured: true,
  },
  {
    title: "GurukulTheInstitute",
    type: "Freelance Project",
    description:
      "A fully functional EdTech platform built as a paid freelance project with OTP authentication and admin/teacher panel.",
    techStack: ["React", "Node.js", "MongoDB", "Tailwind", "Cloud", "GoDaddy"],
    githubLink: "https://github.com/sandeepmthf/Gurukul-FullStack",
    liveLink: "https://www.gurukultheinstitute.in/",
    image: "/project-logos/gurukul-logo.png",
    category: "Full Stack",
    featured: false,
  },
  {
    title: "Jeevan Setu",
    type: "UI/UX Project",
    description:
      "A UI/UX mobile application prototype designed for Smart India Hackathon (SIH) focusing on user-centric design.",
    techStack: ["Figma", "UI/UX"],
    githubLink: "",
    liveLink: "https://www.figma.com/proto/JTZ5g5RDG84IxfhGqeCD5q/jeevansetu",
    image: "/project-logos/jeevansetu-logo.png",
    category: "UI/UX",
    featured: false,
  },
];

const seedInitialData = async () => {
  // Check if MongoDB is connected
  const mongoose = require("mongoose");
  if (mongoose.connection.readyState !== 1) {
    // eslint-disable-next-line no-console
    console.log("⏭️  Skipping seed data - MongoDB not connected");
    return;
  }

  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    const password = await bcrypt.hash(adminPassword, 10);
    await User.create({ email: adminEmail, password });
  }

  for (const project of initialProjects) {
    await Project.updateOne({ title: project.title }, { $set: project }, { upsert: true });
  }

  if ((await Certificate.countDocuments()) === 0) {
    await Certificate.create({
      title: "Software Development Using IBM Granite",
      issuer: "IBM",
      date: "2025",
    });
  }

  if ((await Resume.countDocuments()) === 0) {
    await Resume.create({ fileUrl: "https://example.com/sandeep-resume.pdf" });
  }
};

module.exports = seedInitialData;
