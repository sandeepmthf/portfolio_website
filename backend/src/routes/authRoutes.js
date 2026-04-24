const express = require("express");
const { body } = require("express-validator");
const { login } = require("../controllers/authController");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 chars"),
    handleValidation,
  ],
  login
);

module.exports = router;
