const PostRepository = require("../repositories/post.repository");
const { validatePostUserInput } = require("../utils/validation");

class PostService {
  getAll = async () => {
    try {
      const allPosts = await PostRepository.getAll();
      return allPosts;
    } catch (error) {
      console.log("Cannot get posts");
      throw error;
    }
  };

  getOneById = async (postId) => {
    try {
      const post = await PostRepository.getOneById(postId);
      return post;
    } catch (error) {
      console.log("Cannot get post");
      throw error;
    }
  };

  createOne = async (title, content) => {
    try {
      if (validatePostUserInput(title, content)) {
        return await PostRepository.createOne(title, content);
      }
    } catch (error) {
      console.log("Cannot create post");
      throw error;
    }
  };

  updateOne = async (postId, title, content) => {
    try {
      if (validatePostUserInput(title, content)) {
        return await PostRepository.updateOne(postId, title, content);
      }
    } catch (error) {
      console.log("Cannot update post");
      throw error;
    }
  };

  deleteOne = async (postId) => {
    try {
      await PostRepository.deleteOne(postId);
    } catch (error) {
      console.log("Cannot delete post");
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
      console.log("Cannot update post");
      throw error;
    }
  };
}

module.exports = new PostService();
