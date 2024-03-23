import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    createUser(email: String!, password: String!): User!
  }
  type User {
    uid: String!
    email: String!
  }
`;
