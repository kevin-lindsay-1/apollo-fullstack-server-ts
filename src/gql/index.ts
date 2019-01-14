import { gql, makeExecutableSchema } from 'apollo-server';
import * as Launch from './Launch';
import * as Mission from './Mission';
import * as User from './User';

const schemas = {
  Launch,
  Mission,
  User,
};

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

const mergedSchema = Object.values(schemas).reduce(
  (acc, schema): { acc: any; schema: any } => {
    acc.typeDefs = [...acc.typeDefs, schema.typeDefs];
    acc.resolvers = [...acc.resolvers, schema.resolvers];
    return acc;
  },
  {
    typeDefs: [BaseQuery],
    resolvers: [],
  } as any
);

export default makeExecutableSchema(mergedSchema);
