require("./src/config/config");
const { PORT, MONGODB_URI } = process.env;
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./src/types");
const resolvers = require("./src/resolvers");
const dataSources = require("./src/datasources");

const { getAuthor } = require("./src/utils/getAuth");

const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
};

mongoose
  .connect(MONGODB_URI, options)
  .then(() => console.log("connected to db..."))
  .catch(err => {
    console.log(`Error connecting to DB: ${err}`);
    process.exit(1);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    const AuthUser = await getAuthor(token);

    return { AuthUser };
  },
  dataSources: () => dataSources
});

server
  .listen(PORT)
  .then(({ url }) => console.log(`Server is ready at ${url}`))
  .catch(err => console.log(`Error occurred: ${err}`));
