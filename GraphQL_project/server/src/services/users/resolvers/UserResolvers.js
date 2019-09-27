const { AuthenticationError } = require("apollo-server");

const userResolver = {
  userMutation: {
    addAuthor: async (_, { data }, { dataSources: { User } }) => {
      return await new User().addAuthor(data);
    },

    verifyEmail: async (_, { emailToken }, { dataSources: { user } }) => {
      return await new user().verifyEmail(emailToken);
    },

    updateAuthor: async (_, { data }, { AuthUser, dataSources: { User } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new User().updateAuthor(data);
    },

    login: async (_, { data }, { dataSources: { User } }) => {
      return await new User().login(data);
    },

    deleteAuthor: async (_, { id }, { AuthUser, dataSources: { User } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new User().deleteAuthor(id);
    }
  },

  userQuery: {
    getAuthors: async (_, args, { AuthUser, dataSources: { User } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new User().getAuthors();
    },

    getAuthor: async (_, { id }, { AuthUser, dataSources: { User } }) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new User().getAuthor(id);
    },

    resendEmailVerification: async (_, { id }, { dataSources: { user } }) => {
      return await new user().resendEmailVerification(id);
    },

    sendEmailVerification: async (
      _,
      { id },
      { AuthUser, dataSources: { user } }
    ) => {
      if (!AuthUser)
        throw new AuthenticationError("You are not Authenticated...");
      return await new user().sendEmailVerification(id);
    }
  }
};

module.exports = userResolver;
