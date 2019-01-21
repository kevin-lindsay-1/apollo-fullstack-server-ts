import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Mutation {
    """
    if false, booking failed -- check errors
    """
    bookTrips(launchIds: [ID!]!): TripUpdateResponse!

    """
    if false, cancellation failed -- check errors
    """
    cancelTrip(launchId: ID!): TripUpdateResponse!
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }
`;

export default typeDefs;
