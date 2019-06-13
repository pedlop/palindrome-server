const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const wordSchema = new Schema({
  words: [
    {
      word: String,
      is_palindrome: Boolean
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Words', wordSchema);