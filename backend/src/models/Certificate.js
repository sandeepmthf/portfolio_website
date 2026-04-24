const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", certificateSchema);
