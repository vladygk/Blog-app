const CommentService = require("../services/comment.service");

class CommentController {
  getAllByPost = async (req, res) => {
    try {
        const {postId} = req.query;
        const comments = await CommentService.getAllByPost(postId);
        res.status(200).json(comments);
      } catch (error){
        res.status(500).send(error);
      }
  };

  getOne = async (req, res) => {
    const {id} = req.params;
    try {
        if(!id){
            throw new Error('Invalid id');
        }
        const comment = await CommentService.getOneById(id);
        res.status(200).json(comment);
      } catch (error){
        res.status(500).send(error);
      }
  };

  createOne = async (req, res) => {
    const { postId, content,authorId } = req.body;
    try {
       
      const newComment = await CommentService.createOne(postId, content,authorId);
      res.status(201).json(newComment);
    } catch (error){
      res.status(500).send(error);
    }
  };

  deleteOne = async (req, res) => {
    const {id} = req.params;
    try {
        if(!id){
            throw new Error('Invalid id');
        }

        const comment = await CommentService.deleteOne(id);
        res.status(200).json(comment);
      } catch (error){
        res.status(500).send(error);
      }


  };
}

module.exports = new CommentController();
