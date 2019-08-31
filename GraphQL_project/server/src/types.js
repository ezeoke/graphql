const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID
    title: String!
    body: String
    createdAt: String
    updatedAt: String
    isPublished: Boolean
    likes: Int
    author: Author
  }

  type Author {
    id: ID
    name: String
    username: String!
    email: String
    posts: Post
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAuthors: [Author]
    getAuthor(id: ID!): Author
    getAllPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    addAuthor(data: addAuthorInput!): Author
    addPost(data: addPostInput): Post
  }

  input addAuthorInput {
    name: String
    username: String!
    email: String!
    password: String!
  }

  input addPostInput {
    title: String!
    body: String
    isPublished: Boolean
  }
`;
module.exports = typeDefs;
