const express = require("express");
const { body } = require("express-validator");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/auth");
const { handleValidation } = require("../middleware/validate");

const router = express.Router();

router.get("/", getProjects);

router.post(
  "/",
  protect,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").trim().notEmpty().withMessage("Description is required"),
    body("techStack").isArray().withMessage("techStack must be an array"),
    body("category")
      .optional()
      .isIn(["Full Stack", "UI/UX", "Machine Learning"])
      .withMessage("Invalid category"),
    body("featured").optional().isBoolean().withMessage("featured must be boolean"),
    handleValidation,
  ],
  createProject
);

router.put(
  "/:id",
  protect,
  [
    body("category")
      .optional()
      .isIn(["Full Stack", "UI/UX", "Machine Learning"])
      .withMessage("Invalid category"),
    body("featured").optional().isBoolean().withMessage("featured must be boolean"),
    handleValidation,
  ],
  updateProject
);
router.delete("/:id", protect, deleteProject);

module.exports = router;
