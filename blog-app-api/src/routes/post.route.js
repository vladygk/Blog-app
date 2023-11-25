const express = require("express");
const PostController = require('../controllers/post.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.route("/")
    .get(PostController.getAll)
    .post(authenticateToken,PostController.createOne);

router.route("/:id")
    .get(PostController.getOne)
    .put(PostController.editOne)
    .delete(authenticateToken,PostController.deleteOne);

router.route("/:id/likes")
    .put(PostController.updateLikes);

module.exports = router;
