const Post = require("../models/post.model");
const {DocumentNotFoundError} = require("../utils/error");

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
      const post =  await Post.findById(postId);
      if(!post){
        throw new DocumentNotFoundError("Document not found");
      }
      return post;
    } catch (error) {
      throw error;
    }
  };

  createOne = async (title, content,authorName) => {
    try {
      const newPost = new Post({ title, content,authorName });
      return  await newPost.save();
    } catch (error) {
      throw error;
    }
  };

  updateOne = async (postId, title, content,authorName, likes = 0) => {
    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { title, content,authorName,likes },
        { new: true }
      );
      if(!post){
        throw new DocumentNotFoundError("Document not found");
      }
      return post;
    } catch (error) {
      throw error;
    }
  };

  deleteOne = async (postId) => {
    try {
      const post = await Post.findByIdAndDelete(postId);
      if(!post){
        throw new DocumentNotFoundError("Document not found");
      }
      return post;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new PostRepository();
