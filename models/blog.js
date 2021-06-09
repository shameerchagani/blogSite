const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
      type: String,
      required: true,
  },
  
  snippet: {
    type: String,
    required: true,
  },
  
  created: {
      type: Date,
      default: Date.now()
  },

})

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;