import { gql } from 'apollo-server';
import { MissionResolvers, PatchSize } from '../types';

export const typeDefs = gql`
  type Mission {
    name: String
    missionPatch(size: PatchSize = LARGE): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

interface IResolvers {
  Mission: MissionResolvers.Resolvers;
}

export const resolvers: IResolvers = {
  Mission: {
    missionPatch: (mission, { size }) => {
      return size === PatchSize.Small
        ? mission.missionPatchSmall
        : mission.missionPatchLarge;
    },
  },
};
