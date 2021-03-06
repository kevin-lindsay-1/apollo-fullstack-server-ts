import { MutationResolvers } from '../typings';

interface IResolvers {
  Mutation: MutationResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Mutation: {
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.user.bookTrips({ launchIds });
      const launches = await dataSources.launch.getLaunchesByIds({
        launchIds,
      });
      const success = results && results.length === launchIds.length;

      return {
        launches,
        success,
        message: success
          ? 'trips booked successfully'
          : `the following launches couldn't be booked: ${launchIds.filter(id =>
              results.some(result => result.id === id)
            )}`,
      };
    },
    cancelTrip: async (_, { launchId }, { dataSources }) => {
      const result = dataSources.user.cancelTrip({ launchId });

      if (!result) {
        return {
          success: false,
          message: 'failed to cancel trip',
        };
      }

      const launch = await dataSources.launch.getLaunchById({ launchId });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
      };
    },
  },
};

export default resolvers;
