import * as Sequelize from 'sequelize';

interface IUserAttributes {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  email?: string;
  token?: string;
}

type UserInstance = Sequelize.Instance<IUserAttributes> & IUserAttributes;

export default (sequelize: Sequelize.Sequelize) => {
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
};
