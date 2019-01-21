import Sequelize from 'sequelize';
import { SequelizeAttributes } from '../db';

export interface IUserAttributes {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  token?: string;
}

export type UserInstance = Sequelize.Instance<IUserAttributes> &
  IUserAttributes;

export function userFactory(sequelize: Sequelize.Sequelize) {
  const attributes: SequelizeAttributes<IUserAttributes> = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    token: Sequelize.STRING,
  };
  return sequelize.define<UserInstance, IUserAttributes>('user', attributes);
}

export default userFactory;
