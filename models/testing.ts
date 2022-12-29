const mongoose = require('mongoose');

// Schemas for database collections

//  testing
const course = new mongoose.Schema({
  courseCode: {
    type: String,
    uppercase: true,
    required: true
  },
  institutionCode: String,
  level: String,
  name: String,
  points: Number,
  progression: String,
  subject: String,
  subjectCode: String
});

export const courseModel = mongoose.model('course', course);
