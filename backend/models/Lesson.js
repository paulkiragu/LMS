const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    required: true,
  },

  videourl: {
    type: String,
    default: '',
  },

  course: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema); 
