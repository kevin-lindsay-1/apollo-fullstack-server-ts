import { IReducedLaunch } from './../Launch/dataSource';

export interface ITripUpdateResponse {
  success: boolean;
  message: string;
  launches?: IReducedLaunch[];
}
