const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
  date: Date,
  age: Number,
  sex: Boolean
});

export const adminsModel = mongoose.model('admins', adminsSchema);
