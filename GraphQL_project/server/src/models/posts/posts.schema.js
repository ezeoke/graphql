const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 3,
      trim: true,
      required: true
    },
    body: String,
    isPublished: {
      type: Boolean,
      default: true
    },
    likes: Number,
    author: {
      type: Schema.Types.ObjectId
    }
  },
  { timeStamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
