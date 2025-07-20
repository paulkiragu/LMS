const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },

    course: {
        type: mongoose.Types.ObjectId,
        ref: 'Course',
        required: true
    },

    completedLesson: [
        {
        type: mongoose.Types.ObjectId,
        ref: 'Lesson'
    },
],
}, { timestamps: true} );

module.exports = mongoose.model('Progress',progressSchema)