const mongoose = require('mongoose');

const sequenceUserSchema = new mongoose.Schema({
  _id: String,
  value: Number,
});

module.exports = mongoose.model('UserSequence', sequenceUserSchema);
