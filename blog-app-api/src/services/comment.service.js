const CommentRepository = require("../repositories/comment.repository");
const PostRepository = require("../repositories/post.repository");
const { validateCommentInput } = require("../utils/validation");
const logger = require('../utils/logger');

class CommentService {
  getAllByPost = async (postId) => {
    try {
      const allComments = await CommentRepository.getAll(postId);
      return allComments;
        
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  };

  getOneById = async ( commentId) => {
    try {
      const post = await CommentRepository.getOneById(commentId);
      return post;
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  };

  createOne = async (postId, content,authorName) => {
    try {
      if (validateCommentInput(postId, content,authorName)) {
        await PostRepository.getOneById(postId);

        return await CommentRepository.createOne(postId, content,authorName);
      }
    } catch (error) {
        logger.error(error.message);
      throw error;
    }
  };


  deleteOne = async (commentId) => {
    try {
      await CommentRepository.deleteOne(commentId);
    } catch (error) {
        logger.error(error.message);
      throw error;
    }
  };

  
}

module.exports = new CommentService();
