const express = require("express");
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.route("/all").get(UserController.getAllUsers);
router.route("/login").post(UserController.loginUser);
router.route("/register").post(UserController.registerUser);
module.exports = router;
