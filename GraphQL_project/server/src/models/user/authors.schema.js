const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      trim: true
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    email: {
      type: String,
      requird: true,
      trim: true,
      unique: true,
      minlength: 8
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    },
    posts: [
      {
        type: Schema.Types.ObjectId
      }
    ]
  },
  { timeStamps: true }
);

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;
