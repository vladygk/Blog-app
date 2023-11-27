const express = require("express");
const CommentController = require('../controllers/comment.controller');
const authenticateToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.route("/")
    .get(CommentController.getAllByPost)
    .post(authenticateToken,CommentController.createOne);

router.route("/:id")
    .get(CommentController.getOne)
    .delete(authenticateToken, CommentController.deleteOne);

module.exports = router;
