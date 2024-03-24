import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      uid
      email
    }
  }
`;

export const VERIFY_USER_TOKEN = gql`
  mutation VerifyUserToken($token: String!) {
    verifyUserToken(token: $token) {
      uid
      email
    }
  }
`;
