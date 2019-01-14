import { gql } from 'apollo-server';
import { paginateResults } from '../../utils';
import { LaunchResolvers, MutationResolvers, QueryResolvers } from '../types';

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

  extend type Mutation {
    """
    if false, booking failed -- check errors
    """
    bookTrips(launchIds: [ID!]!): TripUpdateResponse!

    """
    if false, cancellation failed -- check errors
    """
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String!): String! # login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
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

  type Rocket {
    id: ID!
    name: String
    type: String
  }
`;

interface IResolvers {
  Query: QueryResolvers.Resolvers;
  Mutation: MutationResolvers.Resolvers;
  Launch: LaunchResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Query: {
    launches: async (_, { pageSize, after }, { dataSources }) => {
      const allLaunches = await dataSources.launchAPI.getAllLaunches();
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
      dataSources.launchAPI.getLaunchById({ launchId: id }),
  },
  Mutation: {
    bookTrips: async (_, { launchIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
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
      const result = dataSources.userAPI.cancelTrip({ launchId });

      if (!result) {
        return {
          success: false,
          message: 'failed to cancel trip',
        };
      }

      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: 'trip cancelled',
        launches: [launch],
      };
    },
  },
  Launch: {
    isBooked: async (launch, _, { dataSources }) =>
      dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  },
};
