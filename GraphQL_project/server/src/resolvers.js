const resolvers = {
  Mutation: {
    addAuthor: (parent, args, context, info) => {
      return;
    }
  },

  Query: {
    getAuthors: (parent, args, context, info) => {
      return "We are working";
    }
  }
};
