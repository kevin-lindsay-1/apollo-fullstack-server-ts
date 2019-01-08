import { execute } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import {
  ApolloServer,
  context as defaultContext,
  LaunchAPI,
  resolvers,
  store,
  typeDefs,
  UserAPI,
} from '..';
export { toPromise } from 'apollo-link';

/**
 * Integration testing utils
 */
export const constructTestServer = ({ context = defaultContext } = {}) => {
  const userAPI = new UserAPI({ store });
  const launchAPI = new LaunchAPI();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({ userAPI, launchAPI }),
    context,
  });

  return { server, userAPI, launchAPI };
};

/**
 * e2e Testing Utils
 */

export const startTestServer = async server => {
  // if using apollo-server-express...
  // const app = express();
  // server.applyMiddleware({ app });
  // const httpServer = await app.listen(0);

  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};
