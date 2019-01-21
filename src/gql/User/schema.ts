import { gql } from 'apollo-server';
import { MutationResolvers, QueryResolvers, UserResolvers } from '../types';

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

interface IResolvers {
  Query: QueryResolvers.Resolvers;
  Mutation: MutationResolvers.Resolvers;
  User: UserResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Query: {
    me: async (_, __, { dataSources }) => dataSources.user.findOrCreateUser(),
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.user.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString('base64');
      return '';
    },
  },
  User: {
    trips: async (_, __, { dataSources }) => {
      // get ids of launches by user
      const launchIds = await dataSources.user.getLaunchIdsByUser();

      if (!launchIds.length) return [];

      // look up those launches by their ids
      return (
        dataSources.launch.getLaunchesByIds({
          launchIds,
        }) || []
      );
    },
  },
};

export default { typeDefs, resolvers };
