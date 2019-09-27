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
    resendEmailVerification(id: ID!): String!
    sendEmailVerification(id: ID!): String!
  }

  extend type Mutation {
    login(data: loginInput): loginResponse
    verifyEmail(emailToken: String!): String!
    addAuthor(data: addAuthorInput!): String
    updateAuthor(data: updateAuthor): String
    deleteAuthor(id: ID!): String
  }

  type loginResponse {
    code: Int
    token: String
  }

  input addAuthorInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input updateAuthor {
    authorId: ID!
    name: String
    username: String
    password: String
  }

  input loginInput {
    email: String!
    password: String!
  }
`;
