const Comment = require("../models/comment.model");
const {DocumentNotFoundError} = require("../utils/error");


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
      const comment = await Comment.findById(commentId);
      if(!comment){
        throw new DocumentNotFoundError("Document not found");
      }
      return comment;
    } catch (error) {
      throw error;
    }
  };

  createOne = async (postId, content,authorName) => {
    try {
        
      const newComment = new Comment({ postId, content,authorName });
      console.log(newComment);
      return  await newComment.save();
    } catch (error) {
      throw error;
    }
  };

  deleteOne = async (commentId) => {
    try {
      const comment = await Comment.findByIdAndDelete(commentId);
      if(!comment){
        throw new DocumentNotFoundError("Document not found");
      }
      return comment;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new CommentRepository();
