const PostService = require("../services/post.service");

class PostController {
  getAll = async (req, res) => {
    try {
        
        const posts = await PostService.getAll();
        res.status(200).json(posts);
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
        const post = await PostService.getOneById(id);
        res.status(200).json(post);
      } catch (error){
        res.status(500).send(error);
      }
  };

  updateLikes = async (req,res)=>{
    const {id} = req.params;
    const {step} = req.body;
    try {
        if(!id){
            throw new Error('Invalid id');
        }
        const post = await PostService.updateLikes(id,step);
        res.status(200).json(post);
      } catch (error){
        res.status(500).send(error);
      }
  }

  createOne = async (req, res) => {
    const { title, content,authorId } = req.body;
    try {
      const newPost = await PostService.createOne(title, content,authorId);
      res.status(201).json(newPost);
    } catch (error){
      res.status(500).send(error);
    }
  };

  editOne = async (req, res) => {
    const {id} = req.params;
    const { title, content,authorId } = req.body;
    try {
        
        if(!id){
            throw new Error('Invalid id');
        }
      const editedPost = await PostService.updateOne(id, title, content,authorId);
      res.status(200).json(editedPost);

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

        const post = await PostService.deleteOne(id);
        res.status(200).json(post);
      } catch (error){
        res.status(500).send(error);
      }


  };
}

module.exports = new PostController();
