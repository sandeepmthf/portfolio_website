const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || "*", credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => res.status(200).json({ ok: true }));
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/contact", contactRoutes);

app.use((err, _req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: "Server error", details: err.message });
});

module.exports = app;
