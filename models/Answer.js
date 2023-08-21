const mongoose = require('mongoose');
const commentSchema = require("../models/Comments");

const answerSchema = new mongoose.Schema({
  aid:String,  
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: String,
  date: {
    type: Date,
    default: Date.now,
  },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  comments: [commentSchema.schema],
});

module.exports = mongoose.model('Answer', answerSchema);
