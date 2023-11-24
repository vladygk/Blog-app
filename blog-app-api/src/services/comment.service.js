const CommentRepository = require("../repositories/comment.repository");
const { validateCommentInput } = require("../utils/validation");
const logger = require('../utils/logger');

class CommentService {
  getAllByPost = async (postId) => {
    try {

      const allComments = await CommentRepository.getAll(postId);
      return allComments;
        
    } catch (error) {
      logger.error("Cannot get comments");
      throw error;
    }
  };

  getOneById = async ( commentId) => {
    try {
      const post = await CommentRepository.getOneById(commentId);
      return post;
    } catch (error) {
      logger.error("Cannot get comment");
      throw error;
    }
  };

  createOne = async (postId, content,authorId) => {
    try {
      if (validateCommentInput(postId, content,authorId)) {
        console.log(postId, content, authorId);
        return await CommentRepository.createOne(postId, content,authorId);
      }
    } catch (error) {
        logger.error("Cannot create comment");
      throw error;
    }
  };


  deleteOne = async (commentId) => {
    try {
      await CommentRepository.deleteOne(commentId);
    } catch (error) {
        logger.error("Cannot delete comment");
      throw error;
    }
  };

  
}

module.exports = new CommentService();
