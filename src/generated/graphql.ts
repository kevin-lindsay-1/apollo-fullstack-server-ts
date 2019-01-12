export type Maybe<T> = T | null;

export enum PatchSize {
  Small = 'SMALL',
  Large = 'LARGE',
}

// ====================================================
// Types
// ====================================================

export interface Query {
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

  mission?: Maybe<Mission>;

  rocket?: Maybe<Rocket>;

  isBooked: boolean;
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
  /** if false, booking failed -- check errors */
  bookTrips: TripUpdateResponse;
  /** if false, cancellation failed -- check errors */
  cancelTrip: TripUpdateResponse;

  login?: Maybe<string>;
}

export interface TripUpdateResponse {
  success: boolean;

  message?: Maybe<string>;

  launches?: Maybe<(Maybe<Launch>)[]>;
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
export interface BookTripsMutationArgs {
  launchIds: (Maybe<string>)[];
}
export interface CancelTripMutationArgs {
  launchId: string;
}
export interface LoginMutationArgs {
  email?: Maybe<string>;
}

import { GraphQLResolveInfo } from 'graphql';

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
  export interface Resolvers<Context = {}, TypeParent = {}> {
    launches?: LaunchesResolver<LaunchConnection, TypeParent, Context>;

    launch?: LaunchResolver<Maybe<Launch>, TypeParent, Context>;

    me?: MeResolver<Maybe<User>, TypeParent, Context>;
  }

  export type LaunchesResolver<
    R = LaunchConnection,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, LaunchesArgs>;
  export interface LaunchesArgs {
    /** The number of results to show. Must be >= 1. */
    pageSize?: number;
    /** If you add a cursor here, it will only return results _after_ this cursor */
    after?: Maybe<string>;
  }

  export type LaunchResolver<
    R = Maybe<Launch>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, LaunchArgs>;
  export interface LaunchArgs {
    id: string;
  }

  export type MeResolver<R = Maybe<User>, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
}
/** Simple wrapper around our list of launches that contains a cursor to the last item in the list. Pass this cursor to the launches query to fetch results after these. */
export namespace LaunchConnectionResolvers {
  export interface Resolvers<Context = {}, TypeParent = LaunchConnection> {
    cursor?: CursorResolver<string, TypeParent, Context>;

    hasMore?: HasMoreResolver<boolean, TypeParent, Context>;

    launches?: LaunchesResolver<(Maybe<Launch>)[], TypeParent, Context>;
  }

  export type CursorResolver<
    R = string,
    Parent = LaunchConnection,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type HasMoreResolver<
    R = boolean,
    Parent = LaunchConnection,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LaunchesResolver<
    R = (Maybe<Launch>)[],
    Parent = LaunchConnection,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace LaunchResolvers {
  export interface Resolvers<Context = {}, TypeParent = Launch> {
    id?: IdResolver<string, TypeParent, Context>;

    site?: SiteResolver<Maybe<string>, TypeParent, Context>;

    mission?: MissionResolver<Maybe<Mission>, TypeParent, Context>;

    rocket?: RocketResolver<Maybe<Rocket>, TypeParent, Context>;

    isBooked?: IsBookedResolver<boolean, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Launch, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type SiteResolver<
    R = Maybe<string>,
    Parent = Launch,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MissionResolver<
    R = Maybe<Mission>,
    Parent = Launch,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type RocketResolver<
    R = Maybe<Rocket>,
    Parent = Launch,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type IsBookedResolver<
    R = boolean,
    Parent = Launch,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MissionResolvers {
  export interface Resolvers<Context = {}, TypeParent = Mission> {
    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    missionPatch?: MissionPatchResolver<Maybe<string>, TypeParent, Context>;
  }

  export type NameResolver<
    R = Maybe<string>,
    Parent = Mission,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MissionPatchResolver<
    R = Maybe<string>,
    Parent = Mission,
    Context = {}
  > = Resolver<R, Parent, Context, MissionPatchArgs>;
  export interface MissionPatchArgs {
    size?: PatchSize;
  }
}

export namespace RocketResolvers {
  export interface Resolvers<Context = {}, TypeParent = Rocket> {
    id?: IdResolver<string, TypeParent, Context>;

    name?: NameResolver<Maybe<string>, TypeParent, Context>;

    type?: TypeResolver<Maybe<string>, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = Rocket, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type NameResolver<
    R = Maybe<string>,
    Parent = Rocket,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type TypeResolver<
    R = Maybe<string>,
    Parent = Rocket,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    trips?: TripsResolver<(Maybe<Launch>)[], TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EmailResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type TripsResolver<
    R = (Maybe<Launch>)[],
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    /** if false, booking failed -- check errors */
    bookTrips?: BookTripsResolver<TripUpdateResponse, TypeParent, Context>;
    /** if false, cancellation failed -- check errors */
    cancelTrip?: CancelTripResolver<TripUpdateResponse, TypeParent, Context>;

    login?: LoginResolver<Maybe<string>, TypeParent, Context>;
  }

  export type BookTripsResolver<
    R = TripUpdateResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, BookTripsArgs>;
  export interface BookTripsArgs {
    launchIds: (Maybe<string>)[];
  }

  export type CancelTripResolver<
    R = TripUpdateResponse,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, CancelTripArgs>;
  export interface CancelTripArgs {
    launchId: string;
  }

  export type LoginResolver<
    R = Maybe<string>,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    email?: Maybe<string>;
  }
}

export namespace TripUpdateResponseResolvers {
  export interface Resolvers<Context = {}, TypeParent = TripUpdateResponse> {
    success?: SuccessResolver<boolean, TypeParent, Context>;

    message?: MessageResolver<Maybe<string>, TypeParent, Context>;

    launches?: LaunchesResolver<Maybe<(Maybe<Launch>)[]>, TypeParent, Context>;
  }

  export type SuccessResolver<
    R = boolean,
    Parent = TripUpdateResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = Maybe<string>,
    Parent = TripUpdateResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type LaunchesResolver<
    R = Maybe<(Maybe<Launch>)[]>,
    Parent = TripUpdateResponse,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
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
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
