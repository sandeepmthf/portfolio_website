const Certificate = require("../models/Certificate");
const mongoose = require("mongoose");

// Mock certificates data
const MOCK_CERTIFICATES = [
  {
    _id: "1",
    title: "Software Development Using IBM Granite",
    issuer: "IBM",
    date: "2025",
  },
];

const getCertificates = async (_req, res) => {
  try {
    // Check if MongoDB is connected
    const isConnected = mongoose.connection.readyState === 1;
    
    let certificates;
    if (!isConnected) {
      certificates = MOCK_CERTIFICATES;
    } else {
      certificates = await Certificate.find().sort({ createdAt: -1 });
    }
    
    return res.status(200).json(certificates);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching certificates:", error);
    return res.status(500).json({ message: "Error fetching certificates", details: error.message });
  }
};

const createCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.create(req.body);
    return res.status(201).json(certificate);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating certificate:", error);
    return res.status(500).json({ message: "Error creating certificate", details: error.message });
  }
};

module.exports = { getCertificates, createCertificate };
