import {
  LaunchResolvers,
  MissionResolvers,
  MutationResolvers,
  PatchSize,
  QueryResolvers,
  UserResolvers,
} from './generated/graphql';
import { paginateResults } from './utils';

const Query: QueryResolvers.Resolvers = {
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
  me: async (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
};

const Mutation: MutationResolvers.Resolvers = {
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
  login: async (_, { email }, { dataSources }) => {
    const user = await dataSources.userAPI.findOrCreateUser({ email });
    if (user) return Buffer.from(email).toString('base64');
    return 'failed to login';
  },
};

const Mission: MissionResolvers.Resolvers = {
  missionPatch: (mission, { size }) => {
    return size === PatchSize.Small
      ? mission.missionPatchSmall
      : mission.missionPatchLarge;
  },
};

const User: UserResolvers.Resolvers = {
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
};

const Launch: LaunchResolvers.Resolvers = {
  isBooked: async (launch, _, { dataSources }) =>
    dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
};

const resolvers: any = {
  Query,
  Mutation,
  Launch,
  Mission,
  User,
};

export default resolvers;
