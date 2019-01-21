import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    login(email: String!): String! # login token
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
`;

export default typeDefs;
