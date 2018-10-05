var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// defined course schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    require: true
  },
  author: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  },
  isPublished: Boolean,
  price: Number
});


module.exports = mongoose.model('Course', courseSchema);