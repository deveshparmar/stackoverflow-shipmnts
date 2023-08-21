const mongoose = require('mongoose');
const comment = require('../models/Comments');

const questionSchema = new mongoose.Schema({
  qid: String, 
  uid: String,
  title: String,
  description: String,
  date: {
    type: Date,
    default: Date.now,
  },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  upvotes:{ type: Number, default: 0 },
  downvotes:{ type: Number, default: 0 },
  comments: [comment.schema],
});

module.exports = mongoose.model('Question', questionSchema);
