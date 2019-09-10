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
    createdAt: String
    updatedAt: String
    email: String
    posts: Post
  }

  type Query {
    getAuthors: [Author]
    getAuthor(id: ID!): Author
    getAllPosts: [Post]
    getPost(id: ID!): Post
  }

  type Mutation {
    addAuthor(data: addAuthorInput!): Author
    addPost(data: addPostInput!): Post
    updatePost(data: updatePost): String
    updateAuthor(data: updateAuthor): Author
    deletePost(id: ID!): String
    addLike(id: ID!): String
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

  input addPostInput {
    authorId: String!
    title: String!
    body: String
    isPublished: Boolean
  }

  input updatePost {
    authorId: String!
    id: ID!
    title: String
    body: String
    isPublished: Boolean
  }
`;

module.exports = typeDefs;
