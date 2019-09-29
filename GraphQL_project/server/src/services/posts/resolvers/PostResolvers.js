const { AuthenticationError } = require("apollo-server");

const postResolver = {
  postMutation: {
    addPost: async (_, { data }, { AuthUser, dataSources: { Post } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new Post().addPost(data);
    },

    updatePost: async (_, { data }, { AuthUser, dataSources: { Post } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new Post().updatePost(data);
    },

    deletePost: async (_, { data }, { AuthUser, dataSources: { Post } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new Post().deletePost(data);
    },

    deleteAuthorPosts: async (
      _,
      { id },
      { AuthUser, dataSources: { Post } }
    ) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new Post().deleteAuthorPosts(id);
    }
  },

  postQuery: {
    getAllPosts: async (_, args, { AuthUser, dataSources: { Post } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new Post().getAllPosts();
    },

    getPost: async (_, { id }, { AuthUser, dataSources: { Post } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new Post().getPost(id);
    }
  }
};

module.exports = postResolver;
