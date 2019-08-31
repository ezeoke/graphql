require("./src/config/config");
const { ApolloServer, gql } = require("apollo-server");
const { PORT, MONGO_URI } = process.env;
const typeDefs = require("./src/types");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server
  .listen(PORT)
  .then(({ url }) => console.log(`Server is ready at ${url}`))
  .catch(err => console.log(`Error occurred: ${err}`));
