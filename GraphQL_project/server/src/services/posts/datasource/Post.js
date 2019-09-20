const PostModel = require("../../../models/posts/posts.schema");
const Author = require("../../../models/user/authors.schema");
const Base = require("../../../base");
const { AuthenticationError } = require("apollo-server");

class Post extends Base {
  // Mutations for POst
  async addPost(data) {
    if (!data) throw new Error("data is not provided...");
    const author = await Author.findOne({ _id: data.authorId });

    data.author = data.authorId;

    const post = await PostModel.create(data);

    author.posts.push(post);
    await author.save();

    return post;
  }

  async updatePost(data) {
    if (!data) throw new UserInputError("no data available");

    const foundPost = await PostModel.findOne({ _id: data.id });

    if (foundPost.author.equals(data.authorId)) {
      const updateData = {
        title: data.title,
        body: data.body,
        isPublished: data.isPublished
      };
      const updatedPost = await PostModel.updateOne(
        { _id: data.id },
        updateData,
        { new: true }
      );

      if (updatedPost.ok === 1) {
        return "Post updated successfully";
      } else {
        ("Cannot update post");
      }
    }

    throw new AuthenticationError("You are not the author of this post.");
  }

  async deletePost(id) {
    // delete a post
  }

  // Query
  async getAllPosts() {
    return await PostModel.find({}).populate({
      path: "author",
      model: "Author"
    });
  }

  async getPost(id) {
    if (!id) throw new UserInputError("no id provided");

    return await PostModel.findOne({ _id: id }).populate({
      path: "author",
      model: "Author"
    });
  }
}

module.exports = Post;
