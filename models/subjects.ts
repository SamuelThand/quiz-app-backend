const mongoose = require('mongoose');

const subjectsSchema = new mongoose.Schema({
  name: String,
  description: String
});

export const subjectsModel = mongoose.model('subjects', subjectsSchema);
