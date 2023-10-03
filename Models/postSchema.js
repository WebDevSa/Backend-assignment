const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;