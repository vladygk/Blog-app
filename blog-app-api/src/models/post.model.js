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
  likes: {
    type: Number,
    default: 0
  },
  authorId: {
    type: String,
    required: 'true',
  },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
