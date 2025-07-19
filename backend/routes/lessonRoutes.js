const express = require("express");
const router = express.Router();

const {
  createLesson,
  getLessonsByCourse,
  updateLesson,
  deleteLesson,
} = require("../controllers/lessonController");

const {
  protect,
  isInstructorOrAdmin,
} = require("../middlewares/authMiddlewares");

// Create a new lesson for a course
router.post("/:courseId", protect, isInstructorOrAdmin, createLesson);

// Get all lessons for a course
router.get("/:courseId", protect, getLessonsByCourse);

// Update a lesson
router.put("/:id", protect, isInstructorOrAdmin, updateLesson);

// Delete a lesson
router.delete("/:id", protect, isInstructorOrAdmin, deleteLesson);

module.exports = router;
