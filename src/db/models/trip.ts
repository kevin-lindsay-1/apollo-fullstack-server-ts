import * as Sequelize from 'sequelize';

export interface ITripAttributes {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  launchId: string;
  userId: number;
}

export type TripInstance = Sequelize.Instance<ITripAttributes> &
  ITripAttributes;

export default (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ITripAttributes> = {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    launchId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  };
  return sequelize.define<TripInstance, ITripAttributes>('trip', attributes);
};
