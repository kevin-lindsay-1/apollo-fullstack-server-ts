import { LaunchResolvers, QueryResolvers } from '../typings';
import { paginateResults } from '../utils';

interface IResolvers {
  Query: QueryResolvers.Resolvers;
  Launch: LaunchResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Query: {
    launches: async (_, { pageSize, after }, { dataSources }) => {
      const allLaunches = await dataSources.launch.getAllLaunches();
      // we want these in reverse chronological order
      allLaunches.reverse();

      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches,
      });

      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        // if the cursor of the end of the paginated results is the same as the
        // last item in _all_ results, then there are no more results after this
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    },
    launch: (_, { id }, { dataSources }) =>
      dataSources.launch.getLaunchById({ launchId: id }),
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.user.isBookedOnLaunch({ launchId: launch.id }),
  },
};

export default resolvers;
