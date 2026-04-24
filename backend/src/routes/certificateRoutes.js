const express = require("express");
const { body } = require("express-validator");
const {
  getCertificates,
  createCertificate,
} = require("../controllers/certificateController");
const { protect } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.get("/", getCertificates);
router.post(
  "/",
  protect,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("issuer").trim().notEmpty().withMessage("Issuer is required"),
    handleValidation,
  ],
  createCertificate
);

module.exports = router;
