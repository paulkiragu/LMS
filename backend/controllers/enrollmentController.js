const Enrollment = require('../models/Enrollement');
const Course = require('../models/Course');

exports.enrollCourse = async (req, res) => {
    try {
        const { courseId} = req.params

        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message:'Course not found'})
        }
        
        const alreadyEnrolled = await Enrollment.findOne({ user: req.user._id, course: courseId });
        if(alreadyEnrolled){
            return res.status(400).json({ message: 'already enrolled' });
        }

        const enrollment = await Enrollment.create({
            user: req.user._id,
            course: courseId
        });

        res.status(201).json({ message:"Enrolled successfully" })
    } catch (error) {
        return res.status(500).json({ message: 'server error', error: error.message });
    }
};

exports.getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');

    const courses = enrollments.map(enroll => enroll.course); 

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: 'server error', error: error.message });
  }
};


exports.checkEnrollment = async  (req, res) => {
    try {
        const { courseId } = req.params;
        const enrollment = await Enrollment.findOne({ user: req.user.id, course: courseId});
        res.status(200).json({ enrolled: !!enrollment });
    } catch (error) {
        res.status(500).json({ message: 'server error', error: error.message})
    }
};

