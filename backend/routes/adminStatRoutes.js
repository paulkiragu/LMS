const express = require('express');
const router = express.Router();
const {
  getAdminOverview,
  getTopCourses,
  getCourseProgressAverages,
} = require('../controllers/adminStatsController');
const { protect, isInstructorOrAdmin} = require('../middlewares/authMiddlewares');

router.get('/overview', protect, isInstructorOrAdmin, getAdminOverview);
router.get('/top-courses', protect, isInstructorOrAdmin, getTopCourses);
router.get('/progress-averages', protect, isInstructorOrAdmin, getCourseProgressAverages);

module.exports = router;
