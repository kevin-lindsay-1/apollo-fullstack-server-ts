import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { AuthenticationError } from 'apollo-server-errors';
import isEmail from 'isemail';
import { IContext } from '../..';
import { IStore } from './../dataSources';

export default class extends DataSource {
  private store: IStore;
  private context!: IContext;

  constructor({ store }: { store: IStore }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  public initialize(config: DataSourceConfig<IContext>) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  public async findOrCreateUser({ email: emailArg }: { email?: string } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  public async bookTrips({ launchIds }: { launchIds: string[] }) {
    const { user } = this.context;
    if (!user || !user.id) {
      throw new AuthenticationError('You are not logged in');
    }

    const results = [];

    // for each launch id, try to book the trip and add it to the results array
    // if successful
    for (const launchId of launchIds) {
      const res = await this.bookTrip({ launchId });
      if (res) results.push(res);
    }

    return results;
  }

  public async bookTrip({ launchId }: { launchId: string }) {
    const { user } = this.context;
    if (!user || !user.id) {
      throw new AuthenticationError('You are not logged in');
    }
    const res = await this.store.trips.findOrCreate({
      where: { userId: user.id, launchId },
    });
    return res[0] || false;
  }

  public async cancelTrip({ launchId }: { launchId: string }) {
    const { user } = this.context;
    if (!user || !user.id) {
      throw new AuthenticationError('You are not logged in');
    }
    return !!this.store.trips.destroy({
      where: { userId: user.id, launchId },
    });
  }

  public async getLaunchIdsByUser() {
    const { user } = this.context;
    if (!user || !user.id) {
      throw new AuthenticationError('You are not logged in');
    }
    const found = await this.store.trips.findAll({
      where: { userId: user.id },
    });
    return found && found.length
      ? found.map(l => l.launchId).filter(l => !!l)
      : [];
  }

  public async isBookedOnLaunch({ launchId }: { launchId: string }) {
    const { user } = this.context;
    if (!user || !user.id) {
      throw new AuthenticationError('You are not logged in');
    }
    const found = await this.store.trips.findAll({
      where: { userId: user.id, launchId },
    });
    return found && found.length > 0;
  }
}
