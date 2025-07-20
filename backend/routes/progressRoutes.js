const express = require('express');
const router = express.Router();
const {
  markLessonComplete,
  getMyProgress,
  getUserProgress,
} = require('../controllers/progressController');
const { protect, isInstructorOrAdmin } = require('../middlewares/authMiddlewares');

// Mark a lesson as complete (user)
router.post('/complete', protect, markLessonComplete);

// Get logged-in user's progress for a course
router.get('/my/:courseId', protect, getMyProgress);

// Admin: Get any user's progress in a course
router.get('/user/:userId/:courseId', protect, isInstructorOrAdmin, getUserProgress);

module.exports = router;
