const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddlewares');
const {
    enrollCourse,
    getMyCourses,
    checkEnrollment
} = require('../controllers/enrollmentController');

router.post('/:courseId', protect, enrollCourse)
router.get('/', protect, getMyCourses);
router.get('/check/:courseId', protect, checkEnrollment);

module.exports = router;