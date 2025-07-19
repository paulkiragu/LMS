const mongoose = require('mongoose');
const Course = require('./Course');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true
    },

    videourl: {
        type: String,
        default: ''
    },

    Course: {
        type: mongoose.Types.ObjectId,
        ref: Course,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.Schema('Lesson', lessonSchema);