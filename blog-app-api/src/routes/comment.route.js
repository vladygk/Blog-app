const express = require("express");
const CommentController = require('../controllers/comment.controller');

const router = express.Router();

router.route("/")
    .get(CommentController.getAllByPost)
    .post(CommentController.createOne);

router.route("/:id")
    .get(CommentController.getOne)
    .delete(CommentController.deleteOne);

module.exports = router;
