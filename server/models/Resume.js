
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  summary: String,
  skills: [String],
  experience: String,
  atsScore: Number,
  version: Number
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
