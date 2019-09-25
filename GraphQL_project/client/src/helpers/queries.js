import { gql } from "apollo-boost";

export const GET_ALL_POSTS = gql`
  query {
    getAllPosts {
      id
      title
      body
      createdAt
    }
  }
`;

export const GET_POST = gql`
  query($id: ID!) {
    getPost(id: $id) {
      id
      title
      body
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation($emailToken: String!) {
    verifyEmail(emailToken: $emailToken)
  }
`;
