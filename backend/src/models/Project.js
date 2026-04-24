const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, default: "" },
    description: { type: String, required: true, trim: true },
    techStack: [{ type: String, trim: true }],
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    image: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Full Stack", "UI/UX", "Machine Learning"],
      default: "Full Stack",
    },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

module.exports = mongoose.model("Project", projectSchema);
