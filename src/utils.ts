import SQL from 'sequelize';

export const paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  getCursor,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    const itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};

export const createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    logging: false,
    operatorsAliases,
    storage: './store.sqlite',
  });

  const users = db.define('user', {
    createdAt: SQL.DATE,
    email: SQL.STRING,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: SQL.INTEGER,
    },
    token: SQL.STRING,
    updatedAt: SQL.DATE,
  });

  const trips = db.define('trip', {
    createdAt: SQL.DATE,
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: SQL.INTEGER,
    },
    launchId: SQL.INTEGER,
    updatedAt: SQL.DATE,
    userId: SQL.INTEGER,
  });

  return { users, trips };
};
