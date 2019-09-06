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
    },

    updateAuthor: async () => {},

    deletePost: async () => {}
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
      if (!id)
        throw new UserInputError(
          "A user with the given email already exits..."
        );
      return await Post.findOne({ _id: id }).populate({
        path: "author",
        model: "Author"
      });
    }
  }
};

module.exports = resolvers;
