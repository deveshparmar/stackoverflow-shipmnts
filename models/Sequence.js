const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  _id: String,
  value: Number,
});

module.exports = mongoose.model('Sequence', sequenceSchema);
