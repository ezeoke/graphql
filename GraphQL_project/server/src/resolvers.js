const mongoose = require("mongoose");
const Author = require("./models/user/authors.schema");
const Post = require("./models/posts/posts.schema");
const { AuthenticationError, UserInputError } = require("apollo-server");

const resolvers = {
  Mutation: {
    addAuthor: async (parent, { data }, context, info) => {
      const foundAuthor = await Author.findOne({ email: data.email });

      if (foundAuthor)
        throw new AuthenticationError(
          "A user with the given email already exits..."
        );

      return await Author.create(data);
    },

    addPost: async (_, { data }, context, info) => {
      if (!data) throw new Error("data is not provided...");
      const author = await Author.findOne({ _id: data.authorId });

      data.author = data.authorId;
      const post = await Post.create(data);

      author.posts.push(post);
      await author.save();

      return post;
    },

    updatePost: async (_, { data }, context, info) => {
      // const postToUpdate = await Post.findByIdAndUpdate(
      //   { _id: data.authorId },
      //   data
      // );
      // return "update successful";

      if (!data) throw new UserInputError("no data available");

      const foundPost = await Post.findOne({ _id: data.id });

      if (foundPost.author.equals(data.authorId)) {
        const updateData = {
          title: data.title,
          body: data.body,
          isPublished: data.isPublished
        };
        const updatedPost = await Post.updateOne({ _id: data.id }, updateData, {
          new: true
        });

        if (updatedPost.ok === 1) {
          return "Post updated successfully";
        } else {
          ("Cannot update post");
        }
      }

      throw new AuthenticationError("You are not the author of this post.");
    },

    updateAuthor: async (_, { data }, context, info) => {
      const updatedAuthor = {
        name: data.name,
        username: data.username,
        password: data.password
      };
      const authorUpdate = await Author.updateOne(
        { _id: data.authorId },
        updatedAuthor,
        { new: true }
      );

      if (authorUpdate.ok === 1) {
        console.log(authorUpdate);
        return "author updated";
      } else {
        ("cannot update author");
      }

      throw new AuthenticationError("This author does not exist");
    },

    deletePost: async (_, { id }, context, info) => {
      const deleteOnePost = await Post.deleteOne({ _id: id });
      if (deleteOnePost) {
        console.log(deleteOnePost);
        return "Post deleted successfully";
      }
    },

    addLike: async (_, { id }, context, info) => {
      const post = await Post.findOne({ _id: id });
      if (post) {
        const data = {
          likes: +1
        };
        await Post.updateOne({ _id: id }, data, {
          new: true
        });
        return "post liked";
      }
    }
  },

  Query: {
    getAuthors: async (parent, args, context, info) => {
      return await Author.find({});
    },

    getAuthor: async (parent, { id }, context, info) => {
      const foundUser = await Author.findById(id);
      if (!foundUser) throw new Error("user with ID does not exist");
      return foundUser;
    },

    getAllPosts: async (_, args, context, info) => {
      return await Post.find({}).populate({
        path: "author",
        model: "Author"
      });
    },

    getPost: async (_, { id }, context, info) => {
      // if (!id)
      //   throw new UserInputError(
      //     "A user with the given email already exists..."
      //   );
      return await Post.findOne({ _id: id }).populate({
        path: "author",
        model: "Author"
      });
    }
  }
};

module.exports = resolvers;
