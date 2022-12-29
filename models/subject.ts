const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: String,
  description: String
});

export const subjectModel = mongoose.model('subject', subjectSchema);
