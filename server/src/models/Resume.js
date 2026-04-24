const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    fileUrl: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", resumeSchema);
