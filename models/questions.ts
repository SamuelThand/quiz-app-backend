const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  creator: { type: String, required: true },
  name: { type: String, required: true },
  question: String,
  option1: String,
  optionX: String,
  option2: String,
  correctOption: String, // Referera till en option ovan
  date: Date,
  level: Number,
  subject: [{ type: String, ref: 'subjects' }],
  language: String
});

questionsSchema.statics.getQuestions = function () {
  return this.questions;
};

export const questionsModel = mongoose.model('questions', questionsSchema);
