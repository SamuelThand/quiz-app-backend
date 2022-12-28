const mongoose = require('mongoose');
const Admins = require('./admins');
const Questions = require('./questions');

const quizzesSchema = new mongoose.Schema({
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

export const quizzesModel = mongoose.model('quizzes', quizzesSchema);
