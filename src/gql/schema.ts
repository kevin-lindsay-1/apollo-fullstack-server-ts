import { gql, makeExecutableSchema } from 'apollo-server';
import { DocumentNode } from 'graphql';
import Launch from './Launch/schema';
import Mission from './Mission/schema';
import Rocket from './Rocket/schema';
import TripUpdateResponse from './TripUpdateResponse/schema';
import User from './User/schema';

const BaseQuery = gql`
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

const schemas = {
  Launch,
  Mission,
  User,
  Rocket,
  TripUpdateResponse,
};

interface IMergedSchema {
  typeDefs: DocumentNode[];
  resolvers: any[];
}

const mergedSchema = Object.values(schemas).reduce(
  (acc, cur) => {
    acc.typeDefs = [...acc.typeDefs, cur.typeDefs];
    acc.resolvers = [...acc.resolvers, cur.resolvers];
    return acc;
  },
  {
    typeDefs: [BaseQuery],
    resolvers: [],
  } as IMergedSchema
);

export const schema = makeExecutableSchema(mergedSchema);
