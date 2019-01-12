import Sequelize from 'sequelize';
import configFile from '../config.json';
import tripFactory from './trip';
import userFactory from './user';

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

const db = {
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
