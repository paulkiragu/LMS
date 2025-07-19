const Course = require("../models/Course");

// CREATE course 
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newCourse = new Course({
      title,
      description,
      instructor: req.user._id,
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: "Error creating course", error: err.message });
  }
};

// READ all courses 
exports.getCourses = async (req, res) => {
  const courses = await Course.find().populate("instructor", "name email");
  res.status(200).json(courses);
};

// READ single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ message: "Error fetching course" });
  }
};

// UPDATE course 
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      req.user.role !== "admin" &&
      String(course.instructor) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Not authorized to update this course" });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// DELETE course 
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      req.user.role !== "admin" &&
      String(course.instructor) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Not authorized to delete this course" });
    }

    await course.remove();
    res.status(200).json({ message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};
