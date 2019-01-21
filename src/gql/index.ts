import { mergeSchemas } from 'graphql-tools';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

// TODO: look into a proper casting for this
const castResolvers: any = resolvers;

export const schema = mergeSchemas({
  schemas: [typeDefs],
  resolvers: castResolvers,
});

export default schema;
