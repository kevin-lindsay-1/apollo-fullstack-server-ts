import { gql } from 'apollo-server';
import { paginateResults } from '../../utils';
import { LaunchResolvers, QueryResolvers } from '../types';

export const typeDefs = gql`
  extend type Query {
    launches(
      """
      The number of results to show. Must be >= 1.
      """
      pageSize: Int = 20

      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    site: String
    isBooked: Boolean!
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
`;

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

export default { typeDefs, resolvers };
