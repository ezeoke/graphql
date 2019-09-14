const { gql } = require("apollo-server");

module.exports = gql`
  type Author {
    id: ID
    name: String
    username: String!
    createdAt: String
    updatedAt: String
    email: String
    posts: Post
  }

  extend type Query {
    getAuthors: [Author]
    getAuthor(id: ID!): Author
  }

  extend type Mutation {
    login(data: loginInput): String
    addAuthor(data: addAuthorInput!): String
    updateAuthor(data: updateAuthor): Author
  }

  input addAuthorInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input updateAuthor {
    name: String
    username: String
    password: String
  }

  input loginInput {
    email: String!
    password: String!
  }
`;
