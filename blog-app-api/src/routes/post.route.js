const express = require("express");
const PostController = require('../controllers/post.controller');


const router = express.Router();

router.route("/")
    .get(PostController.getAll)
    .post(PostController.createOne);

router.route("/:id")
    .get(PostController.getOne)
    .put(PostController.editOne)
    .delete(PostController.deleteOne);

router.route("/:id/likes")
    .put(PostController.updateLikes);

module.exports = router;
