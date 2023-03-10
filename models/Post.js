const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  registerLink: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model("post", postSchema);

module.exports = Post;
