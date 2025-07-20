const Progress = require('../models/Progress');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

//  Mark a lesson as completed
exports.markLessonComplete = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;

    if (!courseId || !lessonId) {
      return res.status(400).json({ message: 'courseId and lessonId are required' });
    }

    let progress = await Progress.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        course: courseId,
        completedLessons: [lessonId],
        percentage: 0,
      });
    } else {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    }

    const totalLessons = await Lesson.countDocuments({ course: courseId });
    const completedCount = progress.completedLessons?.length || 0;

    progress.percentage = totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

    await progress.save();

    res.status(200).json({
      message: 'Lesson marked as complete',
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//  Get progress for logged-in user on a course
exports.getMyProgress = async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!courseId) {
      return res.status(400).json({ message: 'courseId is required' });
    }

    const totalLessons = await Lesson.countDocuments({ course: courseId });
    const progress = await Progress.findOne({ user: req.user._id, course: courseId });

    const completedCount = progress?.completedLessons?.length || 0;
    const percentage = totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

    res.status(200).json({
      courseId,
      completedLessons: progress?.completedLessons || [],
      percentage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

//  Admin - Get user progress in a course
exports.getUserProgress = async (req, res) => {
  try {
    const { userId, courseId } = req.params;

    if (!userId || !courseId) {
      return res.status(400).json({ message: 'userId and courseId are required' });
    }

    const totalLessons = await Lesson.countDocuments({ course: courseId });
    const progress = await Progress.findOne({ user: userId, course: courseId });

    const completedCount = progress?.completedLessons?.length || 0;
    const percentage = totalLessons > 0
      ? Math.round((completedCount / totalLessons) * 100)
      : 0;

    res.status(200).json({
      userId,
      courseId,
      completedLessons: progress?.completedLessons || [],
      percentage,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
