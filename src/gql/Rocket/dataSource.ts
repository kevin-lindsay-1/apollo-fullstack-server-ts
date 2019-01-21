interface IRemoteRocket {
  rocket: {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
  };
}

export interface IReducedRocket {
  id: string;
  name: string;
  type: string;
}

export function reduce(rocket: IRemoteRocket): IReducedRocket {
  return {
    id: rocket.rocket.rocket_id,
    name: rocket.rocket.rocket_name,
    type: rocket.rocket.rocket_type,
  };
}
