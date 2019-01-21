import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Rocket {
    id: ID!
    name: String
    type: String
  }

  extend type Launch {
    rocket: Rocket
  }
`;

export default typeDefs;
