import { gql } from 'apollo-server';
import { QueryResolvers, UserResolvers } from '../types';

export const typeDefs = gql`
  extend type Query {
    me: User
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
`;

interface IResolvers {
  Query: QueryResolvers.Resolvers;
  User: UserResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { dataSources }) =>
      dataSources.userAPI.findOrCreateUser(),
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.userAPI.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launchAPI.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};
