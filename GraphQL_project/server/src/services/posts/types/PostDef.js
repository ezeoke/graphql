const { gql } = require("apollo-server");

module.exports = gql`
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

  extend type Query {
    getAllPosts: [Post]
    getPost(id: ID!): Post
  }

  extend type Mutation {
    addPost(data: addPostInput!): Post
    updatePost(data: updatePost): String
    deletePost(data: deletePost): String
    deleteAuthorPosts(id: ID!): String
    addLike(id: ID!): String
  }

  input addPostInput {
    authorId: ID!
    title: String!
    body: String
    isPublished: Boolean
  }

  input updatePost {
    authorId: ID!
    id: ID!
    title: String
    body: String
    isPublished: Boolean
  }

  input deletePost {
    authorId: ID!
    id: ID!
  }
`;
