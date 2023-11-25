const CommentService = require("../services/comment.service");
const PostService = require("../services/post.service");

class CommentController {
  getAllByPost = async (req, res) => {
    try {
      const { postId } = req.query;
      const comments = await CommentService.getAllByPost(postId);
      res.status(200).json(comments);
    } catch {
      res.status(500).send();
    }
  };

  getOne = async (req, res) => {
    const { id } = req.params;
    try {
      const comment = await CommentService.getOneById(id);
      res.status(200).json(comment);
    } catch (error) {
      if (error.name === "DocumentNotFoundError") {
        res.status(404).send();
      }
      res.status(500).send();
    }
  };

  createOne = async (req, res) => {
    const { postId, content, authorId } = req.body;
    try {
      const post = await PostService.getOneById(postId);
      const newComment = await CommentService.createOne(
        postId,
        content,
        authorId
      );
      res.status(201).json(newComment);
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
      if (!id) {
        throw new Error("Invalid id");
      }

      const comment = await CommentService.deleteOne(id);
      res.status(200).json(comment);
    } catch (error) {
      if (error.name === "DocumentNotFoundError") {
        res.status(404).send();
      }
      res.status(500).send();
    }
  };
}

module.exports = new CommentController();
