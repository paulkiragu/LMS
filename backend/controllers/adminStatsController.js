const User = require('../models/User');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollement');
const Progress = require('../models/Progress');

// @desc: Overview stats for admin dashboard
exports.getAdminOverview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalEnrollments = await Enrollment.countDocuments();

    res.status(200).json({
      totalUsers,
      totalCourses,
      totalEnrollments,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc: Get top 5 courses by enrollment count
exports.getTopCourses = async (req, res) => {
  try {
    const topCourses = await Enrollment.aggregate([
      { $group: { _id: "$course", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course",
        }
      },
      { $unwind: "$course" },
      {
        $project: {
          _id: 0,
          courseId: "$course._id",
          title: "$course.title",
          enrollments: "$count"
        }
      }
    ]);

    res.status(200).json(topCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc: Get average progress per course
exports.getCourseProgressAverages = async (req, res) => {
  try {
    const averages = await Progress.aggregate([
      {
        $group: {
          _id: "$course",
          avgProgress: { $avg: "$percentage" }
        }
      },
      {
        $lookup: {
          from: "courses",
          localField: "_id",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },
      {
        $project: {
          _id: 0,
          courseId: "$course._id",
          title: "$course.title",
          avgProgress: { $round: ["$avgProgress", 0] }
        }
      },
      { $sort: { avgProgress: -1 } }
    ]);

    res.status(200).json(averages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
