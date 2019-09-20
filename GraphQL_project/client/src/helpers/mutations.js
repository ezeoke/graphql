import { gql } from "apollo-boost";

export const ADD_POST = gql`
  mutation(
    $authorId: String!
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
