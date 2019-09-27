import { gql } from "apollo-boost";

export const ADD_POST = gql`
  mutation(
    $authorId: ID!
    $title: String!
    $body: String
    $isPublished: Boolean
  ) {
    addPost(
      data: {
        authorId: $authorId
        title: $title
        body: $body
        isPublished: $isPublished
      }
    ) {
      body
    }
  }
`;

export const UPDATE_POST = gql`
  mutation(
    $authorId: ID!
    $id: ID!
    $title: String
    $body: String
    $isPublished: Boolean
  ) {
    updatePost(
      data: {
        authorId: $authorId
        id: $id
        title: $title
        body: $body
        isPublished: $isPublished
      }
    )
  }
`;

export const DELETE_POST = gql`
  mutation($id: String!) {
    deletePost(id: $id) {
      String
    }
  }
`;

export const LOGIN_USER = gql`
  mutation($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      code
      token
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation(
    $name: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    addAuthor(
      data: {
        name: $name
        username: $username
        password: $password
        email: $email
      }
    )
  }
`;
