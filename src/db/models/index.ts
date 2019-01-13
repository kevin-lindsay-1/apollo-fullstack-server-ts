import Sequelize from 'sequelize';
import configFile from '../config.json';
import tripFactory, { ITripAttributes, TripInstance } from './trip';
import userFactory, { IUserAttributes, UserInstance } from './user';

interface IConfig {
  [key: string]: Sequelize.Options;
}
const config: IConfig = configFile;
const env = process.env.NODE_ENV || 'development';
const options = {
  operatorsAliases: false,
  ...config[env],
};

const sequelize = new Sequelize('database', 'username', 'password', options);

export interface IDatabase {
  sequelize: Sequelize.Sequelize;
  Sequelize: Sequelize.SequelizeStatic;
  trips: Sequelize.Model<TripInstance, ITripAttributes>;
  users: Sequelize.Model<UserInstance, IUserAttributes>;
}

const db: IDatabase = {
  sequelize,
  Sequelize,
  trips: tripFactory(sequelize),
  users: userFactory(sequelize),
};

Object.values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;
