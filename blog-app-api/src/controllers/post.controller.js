const PostService = require("../services/post.service");

class PostController {
  getAll = async (req, res) => {
    try {
        
        const posts = await PostService.getAll();
        res.status(200).json(posts);
      } catch {
        res.status(500).send("Server error");
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
      } catch {
        res.status(500).send("Server error");
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
      } catch {
        res.status(500).send("Server error");
      }
  }

  createOne = async (req, res) => {
    const { title, content } = req.body;
    try {
      const newPost = await PostService.createOne(title, content);
      res.status(201).json(newPost);
    } catch {
      res.status(500).send("Server error");
    }
  };

  editOne = async (req, res) => {
    const {id} = req.params;
    const { title, content } = req.body;
    try {
        
        if(!id){
            throw new Error('Invalid id');
        }
      const editedPost = await PostService.updateOne(id, title, content);
      res.status(200).json(editedPost);

    } catch {
      res.status(500).send("Server error");
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
      } catch {
        res.status(500).send("Server error");
      }


  };
}

module.exports = new PostController();
