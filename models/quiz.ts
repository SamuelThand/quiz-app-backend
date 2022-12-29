const mongoose = require('mongoose');
const Admins = require('./admins');
const Questions = require('./questions');

const quizSchema = new mongoose.Schema({
  creator: {
    type: String,
    ref: 'admins'
  },
  name: String,
  questions: [
    {
      type: String,
      ref: 'questions'
    }
  ],
  level: Number,
  date: Date
});

export const quizModel = mongoose.model('quiz', quizSchema);
