import { RESTDataSource } from 'apollo-datasource-rest';
import { IReducedRocket, reduce as reduceRocket } from '../Rocket/dataSource';
import {
  IReducedMission,
  reduce as reduceMission,
} from './../Mission/dataSource';

export interface IRemoteLaunch {
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

export interface IReducedLaunch {
  id: string;
  cursor: string;
  site: string;
  mission: IReducedMission;
  rocket: IReducedRocket;
}

export default class extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // leaving this inside the class to make the class easier to test
  public reduce(launch: IRemoteLaunch): IReducedLaunch {
    return {
      id: launch.flight_number || '0',
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: reduceMission(launch),
      rocket: reduceRocket(launch),
    };
  }

  public async getAllLaunches() {
    const res: IRemoteLaunch[] = await this.get('launches');

    // transform the raw launches to a more friendly
    return res && res.length ? res.map(l => this.reduce(l)) : [];
  }

  public async getLaunchById({ launchId }: { launchId: string }) {
    const res = await this.get('launches', { flight_number: launchId });
    return this.reduce(res[0]);
  }

  public async getLaunchesByIds({ launchIds }: { launchIds: string[] }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId }))
    );
  }
}
