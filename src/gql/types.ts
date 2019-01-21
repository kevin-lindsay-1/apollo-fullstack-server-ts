export type Maybe<T> = T | null;

export enum PatchSize {
  Small = 'SMALL',
  Large = 'LARGE',
}

// ====================================================
// Types
// ====================================================

export interface Query {
  /** Ignore this; needed something for each root type to get them to appear */
  _?: Maybe<boolean>;

  launches: LaunchConnection;

  launch?: Maybe<Launch>;

  me?: Maybe<User>;
}

/** Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these. */
export interface LaunchConnection {
  cursor: string;

  hasMore: boolean;

  launches: (Maybe<Launch>)[];
}

export interface Launch {
  id: string;

  site?: Maybe<string>;

  isBooked: boolean;

  mission?: Maybe<Mission>;

  rocket?: Maybe<Rocket>;
}

export interface Mission {
  name?: Maybe<string>;

  missionPatch?: Maybe<string>;
}

export interface Rocket {
  id: string;

  name?: Maybe<string>;

  type?: Maybe<string>;
}

export interface User {
  id: string;

  email: string;

  trips: (Maybe<Launch>)[];
}

export interface Mutation {
  /** Ignore this; needed something for each root type to get them to appear */
  _?: Maybe<boolean>;

  login: string;
  /** if false, booking failed -- check errors */
  bookTrips: TripUpdateResponse;
  /** if false, cancellation failed -- check errors */
  cancelTrip: TripUpdateResponse;
}

export interface TripUpdateResponse {
  success: boolean;

  message?: Maybe<string>;

  launches?: Maybe<(Maybe<Launch>)[]>;
}

export interface Subscription {
  /** Ignore this; needed something for each root type to get them to appear */
  _?: Maybe<boolean>;
}

// ====================================================
// Arguments
// ====================================================

export interface LaunchesQueryArgs {
  /** The number of results to show. Must be >= 1. */
  pageSize?: number;
  /** If you add a cursor here, it will only return results _after_ this cursor */
  after?: Maybe<string>;
}
export interface LaunchQueryArgs {
  id: string;
}
export interface MissionPatchMissionArgs {
  size?: PatchSize;
}
export interface LoginMutationArgs {
  email: string;
}
export interface BookTripsMutationArgs {
  launchIds: string[];
}
export interface CancelTripMutationArgs {
  launchId: string;
}

import { GraphQLResolveInfo } from 'graphql';

import { UserInstance } from '../db/models/user';

import { IReducedLaunch } from './Launch/dataSource';

import { IReducedMission } from './Mission/dataSource';

import { ITripUpdateResponse } from './TripUpdateResponse/dataSource';

import { IContext } from '../';

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    /** Ignore this; needed something for each root type to get them to appear */
    _?: _Resolver<Maybe<boolean>, TypeParent, Context>;

    launches?: LaunchesResolver<LaunchConnection, TypeParent, Context>;

    launch?: LaunchResolver<Maybe<IReducedLaunch>, TypeParent, Context>;

    me?: MeResolver<Maybe<UserInstance>, TypeParent, Context>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type LaunchesResolver<
    R = LaunchConnection,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, LaunchesArgs>;
  export interface LaunchesArgs {
    /** The number of results to show. Must be >= 1. */
    pageSize?: number;
    /** If you add a cursor here, it will only return results _after_ this cursor */
    after?: Maybe<string>;
  }

  export type LaunchResolver<
    R = Maybe<IReducedLaunch>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, LaunchArgs>;
  export interface LaunchArgs {
    id: string;
  }

  export type MeResolver<
    R = Maybe<UserInstance>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
}
/** Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these. */
export namespace LaunchConnectionResolvers {
  export interface Resolvers<
    Context = IContext,
    TypeParent = LaunchConnection
  > {
    cursor?: CursorResolver<string, TypeParent, Context>;

    hasMore?: HasMoreResolver<boolean, TypeParent, Context>;

    launches?: LaunchesResolver<(Maybe<IReducedLaunch>)[], TypeParent, Context>;
  }

  export type CursorResolver<
    R = string,
    Parent = LaunchConnection,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type HasMoreResolver<
    R = boolean,
    Parent = LaunchConnection,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type LaunchesResolver<
    R = (Maybe<IReducedLaunch>)[],
    Parent = LaunchConnection,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace LaunchResolvers {
  export interface Resolvers<Context = IContext, TypeParent = IReducedLaunch> {
    id?: IdResolver<string, TypeParent, Context>;

    site?: SiteResolver<Maybe<string>, TypeParent, Context>;

    isBooked?: IsBookedResolver<boolean, TypeParent, Context>;

    mission?: MissionResolver<Maybe<IReducedMission>, TypeParent, Context>;

    rocket?: RocketResolver<Maybe<Rocket>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = IReducedLaunch,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type SiteResolver<
    R = Maybe<string>,
    Parent = IReducedLaunch,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type IsBookedResolver<
    R = boolean,
    Parent = IReducedLaunch,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type MissionResolver<
    R = Maybe<IReducedMission>,
    Parent = IReducedLaunch,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type RocketResolver<
    R = Maybe<Rocket>,
    Parent = IReducedLaunch,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace MissionResolvers {
  export interface Resolvers<Context = IContext, TypeParent = IReducedMission> {
    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    missionPatch?: MissionPatchResolver<Maybe<string>, TypeParent, Context>;
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = IReducedMission,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type MissionPatchResolver<
    R = Maybe<string>,
    Parent = IReducedMission,
    Context = IContext
  > = Resolver<R, Parent, Context, MissionPatchArgs>;
  export interface MissionPatchArgs {
    size?: PatchSize;
  }
}

export namespace RocketResolvers {
  export interface Resolvers<Context = IContext, TypeParent = Rocket> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    type?: TypeResolver<Maybe<string>, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = Rocket,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Rocket,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = Maybe<string>,
    Parent = Rocket,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = IContext, TypeParent = UserInstance> {
    id?: IdResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    trips?: TripsResolver<(Maybe<IReducedLaunch>)[], TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = UserInstance,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string,
    Parent = UserInstance,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type TripsResolver<
    R = (Maybe<IReducedLaunch>)[],
    Parent = UserInstance,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    /** Ignore this; needed something for each root type to get them to appear */
    _?: _Resolver<Maybe<boolean>, TypeParent, Context>;

    login?: LoginResolver<string, TypeParent, Context>;
    /** if false, booking failed -- check errors */
    bookTrips?: BookTripsResolver<ITripUpdateResponse, TypeParent, Context>;
    /** if false, cancellation failed -- check errors */
    cancelTrip?: CancelTripResolver<ITripUpdateResponse, TypeParent, Context>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type LoginResolver<
    R = string,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    email: string;
  }

  export type BookTripsResolver<
    R = ITripUpdateResponse,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, BookTripsArgs>;
  export interface BookTripsArgs {
    launchIds: string[];
  }

  export type CancelTripResolver<
    R = ITripUpdateResponse,
    Parent = {},
    Context = IContext
  > = Resolver<R, Parent, Context, CancelTripArgs>;
  export interface CancelTripArgs {
    launchId: string;
  }
}

export namespace TripUpdateResponseResolvers {
  export interface Resolvers<
    Context = IContext,
    TypeParent = ITripUpdateResponse
  > {
    success?: SuccessResolver<boolean, TypeParent, Context>;

    message?: MessageResolver<Maybe<string>, TypeParent, Context>;

    launches?: LaunchesResolver<
      Maybe<(Maybe<IReducedLaunch>)[]>,
      TypeParent,
      Context
    >;
  }

  export type SuccessResolver<
    R = boolean,
    Parent = ITripUpdateResponse,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = Maybe<string>,
    Parent = ITripUpdateResponse,
    Context = IContext
  > = Resolver<R, Parent, Context>;
  export type LaunchesResolver<
    R = Maybe<(Maybe<IReducedLaunch>)[]>,
    Parent = ITripUpdateResponse,
    Context = IContext
  > = Resolver<R, Parent, Context>;
}

export namespace SubscriptionResolvers {
  export interface Resolvers<Context = IContext, TypeParent = {}> {
    /** Ignore this; needed something for each root type to get them to appear */
    _?: _Resolver<Maybe<boolean>, TypeParent, Context>;
  }

  export type _Resolver<
    R = Maybe<boolean>,
    Parent = {},
    Context = IContext
  > = SubscriptionResolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  IContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  IContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  IContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  LaunchConnection?: LaunchConnectionResolvers.Resolvers;
  Launch?: LaunchResolvers.Resolvers;
  Mission?: MissionResolvers.Resolvers;
  Rocket?: RocketResolvers.Resolvers;
  User?: UserResolvers.Resolvers;
  Mutation?: MutationResolvers.Resolvers;
  TripUpdateResponse?: TripUpdateResponseResolvers.Resolvers;
  Subscription?: SubscriptionResolvers.Resolvers;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
