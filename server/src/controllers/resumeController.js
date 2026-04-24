const Resume = require("../models/Resume");

const getResume = async (_req, res) => {
  const resume = await Resume.findOne().sort({ updatedAt: -1 });
  return res.status(200).json(resume || null);
};

const upsertResume = async (req, res) => {
  const { fileUrl } = req.body;
  const resume = await Resume.findOneAndUpdate(
    {},
    { fileUrl, lastUpdated: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return res.status(200).json(resume);
};

module.exports = { getResume, upsertResume };
