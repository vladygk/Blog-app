require("./config");
const mongoose = require("mongoose");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const uri = `mongodb://${DB_USER}:${DB_PASS}@localhost:27017/${DB_NAME}?authSource=admin`;

async function connectToDatabase() {
  mongoose.connect(uri);
  console.log("Connected to the database");
  const db = mongoose.connection;

  db.once("open", async () => {
    try {
      console.log("here2");
      await Post.createCollection();
      await Post.syncIndexes();
      await Comment.createCollection();
      await Comment.syncIndexes();

      console.log("Database scaffolding complete");
    } catch (error) {
      console.error("Error during database scaffolding:", error);
      throw error;
    }
  });

  return db;
}


module.exports = connectToDatabase;
