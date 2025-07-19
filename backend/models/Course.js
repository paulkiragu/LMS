const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        requred: true
    },

    instructor: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }]
}, { timestamps: true })

module.exports = mongoose.Schema('Course', courseSchema);
