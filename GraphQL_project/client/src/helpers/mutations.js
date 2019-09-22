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
    ) {
      String
    }
  }
`;

export const DELETE_POST = gql`
  mutation($id: String!) {
    deletePost(id: $id) {
      String
    }
  }
`;
