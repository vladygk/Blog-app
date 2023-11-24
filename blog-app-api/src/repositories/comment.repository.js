const Comment = require("../models/comment.model");

class CommentRepository {
  getAll = async (postId) => {
    try {
      return await Comment.find({postId:postId});
    } catch (error) {
      throw error;
    }
  };

  getOneById = async (commentId) => {
    try {
      return await Comment.findById(commentId);
    } catch (error) {
      throw error;
    }
  };

  createOne = async (postId, content,authorId) => {
    try {
        
      const newComment = new Comment({ postId, content,authorId });
      console.log(newComment);
      return  await newComment.save();
    } catch (error) {
      throw error;
    }
  };

  deleteOne = async (commentId) => {
    try {
      return await Comment.findByIdAndDelete(commentId);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new CommentRepository();
