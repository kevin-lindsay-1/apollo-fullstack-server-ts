import { MutationResolvers, QueryResolvers, UserResolvers } from '../typings';

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

export default resolvers;
