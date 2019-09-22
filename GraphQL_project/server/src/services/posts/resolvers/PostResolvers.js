const postResolver = {
  postMutation: {
    addPost: async (_, { data }, { dataSources: { Post } }) => {
      return await new Post().addPost(data);
    },

    updatePost: async (_, { data }, { dataSources: { Post } }) => {
      return await new Post().updatePost(data);
    },

    deletePost: async (_, { data }, { dataSources: { Post } }) => {
      return await new Post().deletePost(data);
    },

    deleteAuthorPosts: async (_, { id }, { dataSources: { Post } }) => {
      return await new Post().deleteAuthorPosts(id);
    }
  },

  postQuery: {
    getAllPosts: async (_, args, { dataSources: { Post } }) => {
      return await new Post().getAllPosts();
    },

    getPost: async (_, { id }, { dataSources: { Post } }) => {
      return await new Post().getPost(id);
    }
  }
};

module.exports = postResolver;
