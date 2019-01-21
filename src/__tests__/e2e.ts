import gql from 'graphql-tag';
import { server } from '../';
import { graphql, startTestServer, toPromise } from './__utils';

const LAUNCH_LIST_QUERY = gql`
  query myLaunches($pageSize: Int, $after: String) {
    launches(pageSize: $pageSize, after: $after) {
      cursor
      launches {
        mission {
          name
          missionPatch
        }
      }
    }
  }
`;

const GET_LAUNCH = gql`
  query launch($id: ID!) {
    launch(id: $id) {
      id
      isBooked
      rocket {
        type
      }
      mission {
        name
      }
    }
  }
`;

describe('Server - e2e', () => {
  let stop: () => void;
  let gqlreq: graphql;

  beforeEach(async () => {
    const testServer = await startTestServer(server);
    stop = testServer.stop;
    gqlreq = testServer.graphql;
  });

  afterEach(() => stop());

  it('gets list of launches', async () => {
    const res = await toPromise(
      gqlreq({
        query: LAUNCH_LIST_QUERY,
        variables: { pageSize: 1, after: '1517949900' },
      })
    );

    expect(res).toMatchSnapshot();
  });

  it('gets a single launch', async () => {
    const res = await toPromise(
      gqlreq({ query: GET_LAUNCH, variables: { id: 30 } })
    );

    expect(res).toMatchSnapshot();
  });
});
