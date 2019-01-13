import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    launches(
      """
      The number of results to show. Must be >= 1.
      """
      pageSize: Int = 30
      """
      If you add a cursor here, it will only return results _after_ this cursor
      """
      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    me: User
  }

  type Mutation {
    """
    if false, booking failed -- check errors
    """
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    """
    if false, cancellation failed -- check errors
    """
    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String # login token
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
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

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize = LARGE): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

export default typeDefs;