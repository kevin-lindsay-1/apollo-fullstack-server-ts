import { execute, FetchResult, GraphQLRequest, Observable } from 'apollo-link';
import { dataSources } from './../gql/dataSources';
export { toPromise } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloServer } from 'apollo-server';
import fetch from 'node-fetch';
import { context as defaultContext } from '../';
import schema from '../gql';

/**
 * Integration testing utils
 */
export const constructTestServer = ({ context = defaultContext } = {}) => {
  const server = new ApolloServer({
    schema,
    dataSources,
    context,
  });

  return { server };
};

/**
 * e2e Testing Utils
 */
export type graphql = (
  { query, variables }: GraphQLRequest
) => Observable<
  FetchResult<{ [key: string]: any }, Record<string, any>, Record<string, any>>
>;

interface IServer {
  link: HttpLink;
  stop: () => void;
  graphql: graphql;
}

export const startTestServer = async (
  server: ApolloServer
): Promise<IServer> => {
  const httpServer = await server.listen({ port: 0 });

  const link = new HttpLink({
    uri: `http://localhost:${httpServer.port}`,
    fetch,
  });

  const executeOperation = ({ query, variables = {} }: GraphQLRequest) =>
    execute(link, { query, variables });

  return {
    link,
    stop: () => httpServer.server.close(),
    graphql: executeOperation,
  };
};
