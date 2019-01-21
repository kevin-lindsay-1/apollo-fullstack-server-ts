import { gql } from 'apollo-server';

export const typeDefs = gql`
  extend type Launch {
    mission: Mission
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
