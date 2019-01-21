import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Query {
    launches(
      """
      The number of results to show. Must be >= 1.
      """
      pageSize: Int = 20

      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
  }

  type Launch {
    id: ID!
    site: String
    isBooked: Boolean!
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }
`;

export default typeDefs;
