import { gql } from 'apollo-server';
import { RocketResolvers } from '../types';

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

interface IResolvers {
  Rocket: RocketResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Rocket: {},
};

export default { typeDefs, resolvers };
