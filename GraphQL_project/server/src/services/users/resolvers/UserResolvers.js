const userResolver = {
  userMutation: {
    addAuthor: async (_, { data }, { dataSources: { User } }) => {
      return await new User().addAuthor(data);
    },

    updateAuthor: async (_, { data }, { dataSources: { User } }) => {
      return await new User().updateAuthor(data);
    },

    login: async (_, { data }, { dataSources: { User } }) => {
      return await new User().loginUser(data);
    }
  },

  userQuery: {
    getAuthors: async (_, args, { dataSources: { User } }) => {
      return await new User().getAuthors();
    },

    getAuthor: async (_, { id }, { dataSources: { User } }) => {
      return await new User().getAuthor(id);
    }
  }
};

module.exports = userResolver;
