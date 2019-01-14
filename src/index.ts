import { ApolloServer } from 'apollo-server';
import { ContextFunction } from 'apollo-server-core';
import { Request } from 'express';
import isEmail from 'isemail';
import LaunchAPI from './datasources/launch';
import UserAPI from './datasources/user';
import database from './db/models';
import { UserInstance } from './db/models/user';
import schema from './gql';

// connect to ORM
const store = database;

export interface IDataSources {
  launchAPI: LaunchAPI;
  userAPI: UserAPI;
}

export interface IContext {
  dataSources: IDataSources;
  user: UserInstance;
}

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
const context: ContextFunction = async ({ req }: { req: Request }) => {
  // simple auth check on every request
  const auth: string = (req.headers && req.headers.authorization) || '';

  // const token = auth.slice('bearer '.length);
  const email = Buffer.from(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };

  // find a user by their email
  const user = await store.users
    .findOrCreate({ where: { email } })
    .spread(i => i);

  return { user };
};

// Set up Apollo Server
const server = new ApolloServer({
  schema,
  dataSources,
  context,
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
  },
});

// Start our server if we're not in a test env.
// if we're in a test env, we'll manually start it in a test
if (process.env.NODE_ENV !== 'test') {
  server.listen({ port: 4000 }).then(({ url }) => {
    // tslint:disable-next-line
    console.log(`app running at ${url}`);
  });
}
