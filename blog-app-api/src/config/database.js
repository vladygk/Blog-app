require("./config");
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const logger = require('../utils/logger');

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const connectionString = `mongodb://${DB_USER}:${DB_PASS}@localhost:27017/${DB_NAME}?authSource=admin`;

const connectToDatabase = async () => {
  mongoose.connect(connectionString);
  logger.info("Connected to the database");
  const db = mongoose.connection;

  db.once("open", async () => {
    try {
      await Post.createCollection();
      await Post.syncIndexes();
      await Comment.createCollection();
      await Comment.syncIndexes();
    } catch (error) {
      console.error("Error during database scaffolding:", error);
      throw error;
    }
  });

  return db;
};

module.exports = connectToDatabase;
