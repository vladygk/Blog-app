const Post = require("../models/post.model");

class PostRepository {
  getAll = async () => {
    try {
      return await Post.find();
    } catch (error) {
      throw error;
    }
  };

  getOneById = async (postId) => {
    try {
      return await Post.findById(postId);
    } catch (error) {
      throw error;
    }
  };

  createOne = async (title, content) => {
    try {
      const newPost = new Post({ title, content });
      return  await newPost.save();
    } catch (error) {
      throw error;
    }
  };

  updateOne = async (postId, title, content, likes = 0) => {
    try {
      return await Post.findByIdAndUpdate(
        postId,
        { title, content,likes },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  };

  deleteOne = async (postId) => {
    try {
      return await Post.findByIdAndDelete(postId);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new PostRepository();
