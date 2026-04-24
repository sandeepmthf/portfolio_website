const Certificate = require("../models/Certificate");

const getCertificates = async (_req, res) => {
  const certificates = await Certificate.find().sort({ createdAt: -1 });
  return res.status(200).json(certificates);
};

const createCertificate = async (req, res) => {
  const certificate = await Certificate.create(req.body);
  return res.status(201).json(certificate);
};

module.exports = { getCertificates, createCertificate };
