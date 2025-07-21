const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { protect, authorizeRoles } = require("../middlewares/authMiddlewares");

// PUBLIC  READ ROUTES
router.get("/me", getCourses);
router.get("/:id", getCourseById);

// PROTECTED WRITE ROUTES
router.post("/", protect, authorizeRoles("admin", "instructor"), createCourse);
router.put("/:id", protect, authorizeRoles("admin", "instructor"), updateCourse);
router.delete("/:id", protect, authorizeRoles("admin", "instructor"), deleteCourse);

module.exports = router;
