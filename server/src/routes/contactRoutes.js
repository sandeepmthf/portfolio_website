const express = require("express");
const { body } = require("express-validator");
const nodemailer = require("nodemailer");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty(),
    body("email").isEmail(),
    body("message").trim().isLength({ min: 5 }),
    handleValidation,
  ],
  async (req, res) => {
    const { name, email, message } = req.body;
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return res.status(200).json({ message: "Message received (email disabled in env)." });
    }

    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE || "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject: `Portfolio Contact from ${name}`,
      html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p>${message}</p>`,
    });

    return res.status(200).json({ message: "Message sent successfully" });
  }
);

module.exports = router;
