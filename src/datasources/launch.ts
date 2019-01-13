import { RESTDataSource } from 'apollo-datasource-rest';

interface IDataSourceLaunch {
  flight_number: string;
  launch_date_unix: string;
  launch_site: {
    site_name: string;
  };
  mission_name: string;
  links: {
    mission_patch_small: string;
    mission_patch: string;
  };
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
  };
}

export interface IMission {
  name: string;
  missionPatchSmall: string;
  missionPatchLarge: string;
}

export interface IResolvedLaunch {
  id: string;
  cursor: string;
  site: string;
  mission: IMission;
  rocket: {
    id: string;
    name: string;
    type: string;
  };
}

export interface ITripUpdateResponse {
  success: boolean;
  message: string;
  launches?: IResolvedLaunch[];
}

export default class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // leaving this inside the class to make the class easier to test
  public launchReducer(launch: IDataSourceLaunch): IResolvedLaunch {
    return {
      id: launch.flight_number || '0',
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }

  public async getAllLaunches() {
    const res: IDataSourceLaunch[] = await this.get('launches');

    // transform the raw launches to a more friendly
    return res && res.length ? res.map(l => this.launchReducer(l)) : [];
  }

  public async getLaunchById({ launchId }: { launchId: string }) {
    const res = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(res[0]);
  }

  public async getLaunchesByIds({ launchIds }: { launchIds: string[] }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}
