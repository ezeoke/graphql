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
      // const findAndUpdate = await Post.findOne({ _id: data.id });
      // if (findAndUpdate) {
      //   const newData = await Post.update(data);
      //   console.log(newData);
      //   return "update successful";
      // }
      // const author = await Author.findOne({ _id: data.authorId });
    },

    updateAuthor: async (_, { data }, context, info) => {
      const author = await Author.findOne({ _id: data.authorId });
      if (author) {
        const authorUpdate = await Author.updateMany({
          data: data.name,
          data: data.username,
          data: data.password
        });
        console.log(authorUpdate);
        return "author updated";
      }
    },

    deletePost: async (_, { id }, context, info) => {
      const deleteOnePost = await Post.deleteOne({ _id: id });
      if (deleteOnePost) {
        console.log(deleteOnePost);
        return "Post deleted successfully";
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
