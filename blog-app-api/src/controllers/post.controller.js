const PostService = require("../services/post.service");

class PostController {
  getAll = async (req, res) => {
    try {
      const posts = await PostService.getAll();
      res.status(200).json(posts);
    } catch {
      res.status(500).send();
    }
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await PostService.getOneById(id);
      res.status(200).json(post);
    } catch (error) {
      if (error.name === "DocumentNotFoundError") {
        res.status(404).send();
      }
      res.status(500).send();
    }
  };

  updateLikes = async (req, res) => {
    const { id } = req.params;
    const { step } = req.body;
    try {
      const post = await PostService.updateLikes(id, step);
      res.status(200).json(post);
    } catch (error) {
      if (error.name === "DocumentNotFoundError") {
        res.status(404).send();
      }
      res.status(500).send();
    }
  };

  createOne = async (req, res) => {
    const { title, content, authorName } = req.body;
    try {
      const newPost = await PostService.createOne(title, content, authorName);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).send();
    }
  };

  editOne = async (req, res) => {
    const { id } = req.params;
    const { title, content, authorName } = req.body;
    try {
      const editedPost = await PostService.updateOne(
        id,
        title,
        content,
        authorName
      );
      res.status(200).json(editedPost);
    } catch (error) {
      if (error.name === "DocumentNotFoundError") {
        res.status(404).send();
      }
      res.status(500).send();
    }
  };

  deleteOne = async (req, res) => {
    const { id } = req.params;
    try {
      const post = await PostService.deleteOne(id);
      res.status(200).json(post);
    } catch (error) {
      if (error.name === "DocumentNotFoundError") {
        res.status(404).send();
      }
      res.status(500).send();
    }
  };
}

module.exports = new PostController();
