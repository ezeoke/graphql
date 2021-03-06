const PostModel = require("../../../models/posts/posts.schema");
const Author = require("../../../models/user/authors.schema");
const Base = require("../../../base");
const { AuthenticationError, UserInputError, Error } = require("apollo-server");

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

  async deletePost(data) {
    if (!data) throw new UserInputError("no data available");

    const foundPost = await PostModel.findOne({ _id: data.id });

    if (!foundPost) {
      return "Post does not exist";
    } else if (foundPost.author.equals(data.authorId)) {
      const postDelete = await PostModel.deleteOne({ _id: data.id });

      if (postDelete.ok === 1) {
        return "Post deleted successfully";
      } else {
        ("Cannot delete post");
      }
    }

    throw new AuthenticationError("You are not the author of this post.");
  }

  async deleteAuthorPosts(id) {
    if (!id) throw new UserInputError("no data available");

    // let btn = confirm("Do you want to delete all posts?");
    const author = await Author.findOne({ _id: id });

    // if (btn == true) {
    if (author) {
      const postsDelete = await author.posts;
      console.log(postsDelete);
      const deleteAll = await PostModel.deleteMany({ _id: postsDelete });
      if (deleteAll.ok === 1) {
        return "posts deleted";
      }
    }
    // }
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
