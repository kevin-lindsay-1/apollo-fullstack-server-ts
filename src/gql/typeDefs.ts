import { gql, makeExecutableSchema } from 'apollo-server';
import Launch from './Launch/typeDefs';
import Mission from './Mission/typeDefs';
import Rocket from './Rocket/typeDefs';
import TripUpdateResponse from './TripUpdateResponse/typeDefs';
import User from './User/typeDefs';

const Base = gql`
  type Query {
    """
    Ignore this; needed something for each root type to get them to appear
    """
    _: Boolean @deprecated
  }
  type Mutation {
    """
    Ignore this; needed something for each root type to get them to appear
    """
    _: Boolean @deprecated
  }
  type Subscription {
    """
    Ignore this; needed something for each root type to get them to appear
    """
    _: Boolean @deprecated
  }
`;

const typeDefs = [Launch, Mission, Rocket, TripUpdateResponse, User];

const mergedDefs = Object.values(typeDefs).reduce(
  (acc, cur) => {
    return [...acc, cur];
  },
  [Base]
);

export const schema = makeExecutableSchema({ typeDefs: mergedDefs });

export default schema;
