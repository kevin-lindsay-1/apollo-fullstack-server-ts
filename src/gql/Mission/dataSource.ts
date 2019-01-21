export interface IRemoteMission {
  mission_name: string;
  links: {
    mission_patch_small: string;
    mission_patch: string;
  };
}

export interface IReducedMission {
  name: string;
  missionPatchSmall: string;
  missionPatchLarge: string;
}

export function reduce(mission: IRemoteMission): IReducedMission {
  return {
    name: mission.mission_name,
    missionPatchSmall: mission.links.mission_patch_small,
    missionPatchLarge: mission.links.mission_patch,
  };
}
