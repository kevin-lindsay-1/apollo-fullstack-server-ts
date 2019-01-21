import database, { IDatabase } from '../db/models';
import LaunchDataSource from './Launch/dataSource';
import UserDataSource from './User/dataSource';

export type IStore = IDatabase;
export const store: IStore = database;

export interface IDataSources {
  launch: LaunchDataSource;
  user: UserDataSource;
}

// set up any dataSources our resolvers need
export const dataSources = () => ({
  launch: new LaunchDataSource(),
  user: new UserDataSource({ store }),
});

export default dataSources;
