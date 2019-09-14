const { gql } = require("apollo-server");

const userDef = require("./services/users/types/UserDef");
const postDef = require("./services/posts/types/PostDef");

const linkSchema = gql`
  type Mutation {
    _: Boolean
  }

  type Query {
    _: Boolean
  }
`;

module.exports = [linkSchema, userDef, postDef];
