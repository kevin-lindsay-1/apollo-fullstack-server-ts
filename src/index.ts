import { ApolloServer } from 'apollo-server';
import isEmail from 'isemail';
import LaunchAPI from './datasources/launch';
import UserAPI from './datasources/user';
import resolvers from './resolvers';
import typeDefs from './schema';
import { createStore } from './utils';

// creates a sequelize connection once. NOT for every request
// TODO: assign to correct type
const store = createStore();

// set up any dataSources our resolvers need
const dataSources = () => ({
  launchAPI: new LaunchAPI(),
  userAPI: new UserAPI({ store }),
});

// the function that sets up the global context for each resolver, using the req
const context = async ({ req }) => {
  // simple auth check on every request
  const auth: string = (req.headers && req.headers.authorization) || '';
  // const token = auth.slice('bearer '.length);
  const email = Buffer.from(auth, 'base64').toString('ascii');

  // if the email isn't formatted validly, return null for user
  if (!isEmail.validate(email)) return { user: null };
  // find a user by their email
  const users = await store.users.findOrCreate({ where: { email } });
  const user = users && users[0] ? users[0] : null;

  return {
    user: {
      ...user.dataValues,
    },
  };
};

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
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

// export all the important pieces for integration/e2e tests to use
export {
  dataSources,
  context,
  typeDefs,
  resolvers,
  ApolloServer,
  LaunchAPI,
  UserAPI,
  store,
  server,
};
