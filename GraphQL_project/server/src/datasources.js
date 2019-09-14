const User = require("./services/users/datasource/User");
const Post = require("./services/posts/datasource/Post");

const datasources = {
  User,
  Post
};

module.exports = datasources;
