const Lesson = require("../models/Lesson");
const Course = require("../models/Course");

// Create a lesson and add it to a course
exports.createLesson = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const lesson = new Lesson({ title, content, course: courseId });
    await lesson.save();

    course.lessons.push(lesson._id);
    await course.save();

    res.status(201).json(lesson);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all lessons for a course
exports.getLessonsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const lessons = await Lesson.find({ course: courseId });
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Lesson.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Lesson not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await Lesson.findByIdAndDelete(id);
    if (!lesson) return res.status(404).json({ message: "Lesson not found" });

    await Course.findByIdAndUpdate(lesson.course, {
      $pull: { lessons: lesson._id },
    });

    res.json({ message: "Lesson deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
