const PostRepository = require("../repositories/post.repository");
const { validatePostInput } = require("../utils/validation");
const logger = require('../utils/logger');

class PostService {
  getAll = async () => {
    try {
      const allPosts = await PostRepository.getAll();
      return allPosts;
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  };

  getOneById = async (postId) => {
    try {
      const post = await PostRepository.getOneById(postId);
      return post;
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  };

  createOne = async (title, content,authorId) => {
    try {
      if (validatePostInput(title, content,authorId)) {
        return await PostRepository.createOne(title, content,authorId);
      }
    } catch (error) {
        logger.error(error.message);
      throw error;
    }
  };

  updateOne = async (postId, title, content,authorId) => {
    try {
      if (validatePostInput(title, content,authorId)) {
        return await PostRepository.updateOne(postId, title, content,authorId);
      }
    } catch (error) {
        logger.error(error.message);
      throw error;
    }
  };

  deleteOne = async (postId) => {
    try {
      await PostRepository.deleteOne(postId);
    } catch (error) {
        logger.error(error.message);
      throw error;
    }
  };

  updateLikes = async (postId, step) => {
    try {
      const post = await this.getOneById(postId);
      let newLikes = post.likes + step;
      if (newLikes < 0) {
        newLikes = 0;
      }
      return await PostRepository.updateOne(
        postId,
        post.title,
        post.content,
        newLikes
      );
    } catch (error) {
        logger.error(error.message);
      throw error;
    }
  };
}

module.exports = new PostService();
