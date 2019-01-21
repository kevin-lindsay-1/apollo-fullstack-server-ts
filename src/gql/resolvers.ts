import Launch from './Launch/resolvers';
import Mission from './Mission/resolvers';
import TripUpdateResponse from './TripUpdateResponse/resolvers';
import { IResolvers } from './typings';
import User from './User/resolvers';

const Base: IResolvers = {
  Query: {},
  Mutation: {},
  Subscription: {},
};

const resolvers = [Launch, Mission, TripUpdateResponse, User];

export const merged = resolvers.reduce(
  (acc, cur) => {
    return [...acc, cur];
  },
  [Base]
);

export default merged;
