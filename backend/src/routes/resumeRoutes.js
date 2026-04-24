const express = require("express");
const { body } = require("express-validator");
const { getResume, upsertResume } = require("../controllers/resumeController");
const { protect } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.get("/", getResume);
router.post(
  "/",
  protect,
  [body("fileUrl").isURL().withMessage("fileUrl must be a valid URL"), handleValidation],
  upsertResume
);

module.exports = router;
