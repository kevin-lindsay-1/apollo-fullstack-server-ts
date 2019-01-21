import { MissionResolvers, PatchSize } from '../typings';

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

export default resolvers;
