
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model CropType
 * 
 */
export type CropType = $Result.DefaultSelection<Prisma.$CropTypePayload>
/**
 * Model ProduceListing
 * 
 */
export type ProduceListing = $Result.DefaultSelection<Prisma.$ProduceListingPayload>
/**
 * Model MarketPrice
 * 
 */
export type MarketPrice = $Result.DefaultSelection<Prisma.$MarketPricePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more CropTypes
 * const cropTypes = await prisma.cropType.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more CropTypes
   * const cropTypes = await prisma.cropType.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.cropType`: Exposes CRUD operations for the **CropType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CropTypes
    * const cropTypes = await prisma.cropType.findMany()
    * ```
    */
  get cropType(): Prisma.CropTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.produceListing`: Exposes CRUD operations for the **ProduceListing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProduceListings
    * const produceListings = await prisma.produceListing.findMany()
    * ```
    */
  get produceListing(): Prisma.ProduceListingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketPrice`: Exposes CRUD operations for the **MarketPrice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarketPrices
    * const marketPrices = await prisma.marketPrice.findMany()
    * ```
    */
  get marketPrice(): Prisma.MarketPriceDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    CropType: 'CropType',
    ProduceListing: 'ProduceListing',
    MarketPrice: 'MarketPrice'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "cropType" | "produceListing" | "marketPrice"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      CropType: {
        payload: Prisma.$CropTypePayload<ExtArgs>
        fields: Prisma.CropTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CropTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CropTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>
          }
          findFirst: {
            args: Prisma.CropTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CropTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>
          }
          findMany: {
            args: Prisma.CropTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>[]
          }
          create: {
            args: Prisma.CropTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>
          }
          createMany: {
            args: Prisma.CropTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CropTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>[]
          }
          delete: {
            args: Prisma.CropTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>
          }
          update: {
            args: Prisma.CropTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>
          }
          deleteMany: {
            args: Prisma.CropTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CropTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CropTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>[]
          }
          upsert: {
            args: Prisma.CropTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CropTypePayload>
          }
          aggregate: {
            args: Prisma.CropTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCropType>
          }
          groupBy: {
            args: Prisma.CropTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<CropTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.CropTypeCountArgs<ExtArgs>
            result: $Utils.Optional<CropTypeCountAggregateOutputType> | number
          }
        }
      }
      ProduceListing: {
        payload: Prisma.$ProduceListingPayload<ExtArgs>
        fields: Prisma.ProduceListingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProduceListingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProduceListingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>
          }
          findFirst: {
            args: Prisma.ProduceListingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProduceListingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>
          }
          findMany: {
            args: Prisma.ProduceListingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>[]
          }
          create: {
            args: Prisma.ProduceListingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>
          }
          createMany: {
            args: Prisma.ProduceListingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProduceListingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>[]
          }
          delete: {
            args: Prisma.ProduceListingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>
          }
          update: {
            args: Prisma.ProduceListingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>
          }
          deleteMany: {
            args: Prisma.ProduceListingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProduceListingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProduceListingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>[]
          }
          upsert: {
            args: Prisma.ProduceListingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProduceListingPayload>
          }
          aggregate: {
            args: Prisma.ProduceListingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduceListing>
          }
          groupBy: {
            args: Prisma.ProduceListingGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProduceListingGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProduceListingCountArgs<ExtArgs>
            result: $Utils.Optional<ProduceListingCountAggregateOutputType> | number
          }
        }
      }
      MarketPrice: {
        payload: Prisma.$MarketPricePayload<ExtArgs>
        fields: Prisma.MarketPriceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketPriceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketPriceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>
          }
          findFirst: {
            args: Prisma.MarketPriceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketPriceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>
          }
          findMany: {
            args: Prisma.MarketPriceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>[]
          }
          create: {
            args: Prisma.MarketPriceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>
          }
          createMany: {
            args: Prisma.MarketPriceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketPriceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>[]
          }
          delete: {
            args: Prisma.MarketPriceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>
          }
          update: {
            args: Prisma.MarketPriceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>
          }
          deleteMany: {
            args: Prisma.MarketPriceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketPriceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketPriceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>[]
          }
          upsert: {
            args: Prisma.MarketPriceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketPricePayload>
          }
          aggregate: {
            args: Prisma.MarketPriceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketPrice>
          }
          groupBy: {
            args: Prisma.MarketPriceGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketPriceGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketPriceCountArgs<ExtArgs>
            result: $Utils.Optional<MarketPriceCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    cropType?: CropTypeOmit
    produceListing?: ProduceListingOmit
    marketPrice?: MarketPriceOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CropTypeCountOutputType
   */

  export type CropTypeCountOutputType = {
    listings: number
    marketPrices: number
  }

  export type CropTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | CropTypeCountOutputTypeCountListingsArgs
    marketPrices?: boolean | CropTypeCountOutputTypeCountMarketPricesArgs
  }

  // Custom InputTypes
  /**
   * CropTypeCountOutputType without action
   */
  export type CropTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropTypeCountOutputType
     */
    select?: CropTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CropTypeCountOutputType without action
   */
  export type CropTypeCountOutputTypeCountListingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProduceListingWhereInput
  }

  /**
   * CropTypeCountOutputType without action
   */
  export type CropTypeCountOutputTypeCountMarketPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketPriceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model CropType
   */

  export type AggregateCropType = {
    _count: CropTypeCountAggregateOutputType | null
    _min: CropTypeMinAggregateOutputType | null
    _max: CropTypeMaxAggregateOutputType | null
  }

  export type CropTypeMinAggregateOutputType = {
    id: string | null
    name_en: string | null
    name_hi: string | null
    name_mr: string | null
    name_ta: string | null
    name_te: string | null
    name_kn: string | null
    name_ml: string | null
    name_pa: string | null
    name_es: string | null
  }

  export type CropTypeMaxAggregateOutputType = {
    id: string | null
    name_en: string | null
    name_hi: string | null
    name_mr: string | null
    name_ta: string | null
    name_te: string | null
    name_kn: string | null
    name_ml: string | null
    name_pa: string | null
    name_es: string | null
  }

  export type CropTypeCountAggregateOutputType = {
    id: number
    name_en: number
    name_hi: number
    name_mr: number
    name_ta: number
    name_te: number
    name_kn: number
    name_ml: number
    name_pa: number
    name_es: number
    _all: number
  }


  export type CropTypeMinAggregateInputType = {
    id?: true
    name_en?: true
    name_hi?: true
    name_mr?: true
    name_ta?: true
    name_te?: true
    name_kn?: true
    name_ml?: true
    name_pa?: true
    name_es?: true
  }

  export type CropTypeMaxAggregateInputType = {
    id?: true
    name_en?: true
    name_hi?: true
    name_mr?: true
    name_ta?: true
    name_te?: true
    name_kn?: true
    name_ml?: true
    name_pa?: true
    name_es?: true
  }

  export type CropTypeCountAggregateInputType = {
    id?: true
    name_en?: true
    name_hi?: true
    name_mr?: true
    name_ta?: true
    name_te?: true
    name_kn?: true
    name_ml?: true
    name_pa?: true
    name_es?: true
    _all?: true
  }

  export type CropTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CropType to aggregate.
     */
    where?: CropTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropTypes to fetch.
     */
    orderBy?: CropTypeOrderByWithRelationInput | CropTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CropTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CropTypes
    **/
    _count?: true | CropTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CropTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CropTypeMaxAggregateInputType
  }

  export type GetCropTypeAggregateType<T extends CropTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateCropType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCropType[P]>
      : GetScalarType<T[P], AggregateCropType[P]>
  }




  export type CropTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CropTypeWhereInput
    orderBy?: CropTypeOrderByWithAggregationInput | CropTypeOrderByWithAggregationInput[]
    by: CropTypeScalarFieldEnum[] | CropTypeScalarFieldEnum
    having?: CropTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CropTypeCountAggregateInputType | true
    _min?: CropTypeMinAggregateInputType
    _max?: CropTypeMaxAggregateInputType
  }

  export type CropTypeGroupByOutputType = {
    id: string
    name_en: string
    name_hi: string | null
    name_mr: string | null
    name_ta: string | null
    name_te: string | null
    name_kn: string | null
    name_ml: string | null
    name_pa: string | null
    name_es: string | null
    _count: CropTypeCountAggregateOutputType | null
    _min: CropTypeMinAggregateOutputType | null
    _max: CropTypeMaxAggregateOutputType | null
  }

  type GetCropTypeGroupByPayload<T extends CropTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CropTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CropTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CropTypeGroupByOutputType[P]>
            : GetScalarType<T[P], CropTypeGroupByOutputType[P]>
        }
      >
    >


  export type CropTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_en?: boolean
    name_hi?: boolean
    name_mr?: boolean
    name_ta?: boolean
    name_te?: boolean
    name_kn?: boolean
    name_ml?: boolean
    name_pa?: boolean
    name_es?: boolean
    listings?: boolean | CropType$listingsArgs<ExtArgs>
    marketPrices?: boolean | CropType$marketPricesArgs<ExtArgs>
    _count?: boolean | CropTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["cropType"]>

  export type CropTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_en?: boolean
    name_hi?: boolean
    name_mr?: boolean
    name_ta?: boolean
    name_te?: boolean
    name_kn?: boolean
    name_ml?: boolean
    name_pa?: boolean
    name_es?: boolean
  }, ExtArgs["result"]["cropType"]>

  export type CropTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name_en?: boolean
    name_hi?: boolean
    name_mr?: boolean
    name_ta?: boolean
    name_te?: boolean
    name_kn?: boolean
    name_ml?: boolean
    name_pa?: boolean
    name_es?: boolean
  }, ExtArgs["result"]["cropType"]>

  export type CropTypeSelectScalar = {
    id?: boolean
    name_en?: boolean
    name_hi?: boolean
    name_mr?: boolean
    name_ta?: boolean
    name_te?: boolean
    name_kn?: boolean
    name_ml?: boolean
    name_pa?: boolean
    name_es?: boolean
  }

  export type CropTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name_en" | "name_hi" | "name_mr" | "name_ta" | "name_te" | "name_kn" | "name_ml" | "name_pa" | "name_es", ExtArgs["result"]["cropType"]>
  export type CropTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    listings?: boolean | CropType$listingsArgs<ExtArgs>
    marketPrices?: boolean | CropType$marketPricesArgs<ExtArgs>
    _count?: boolean | CropTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CropTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CropTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CropTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CropType"
    objects: {
      listings: Prisma.$ProduceListingPayload<ExtArgs>[]
      marketPrices: Prisma.$MarketPricePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name_en: string
      name_hi: string | null
      name_mr: string | null
      name_ta: string | null
      name_te: string | null
      name_kn: string | null
      name_ml: string | null
      name_pa: string | null
      name_es: string | null
    }, ExtArgs["result"]["cropType"]>
    composites: {}
  }

  type CropTypeGetPayload<S extends boolean | null | undefined | CropTypeDefaultArgs> = $Result.GetResult<Prisma.$CropTypePayload, S>

  type CropTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CropTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CropTypeCountAggregateInputType | true
    }

  export interface CropTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CropType'], meta: { name: 'CropType' } }
    /**
     * Find zero or one CropType that matches the filter.
     * @param {CropTypeFindUniqueArgs} args - Arguments to find a CropType
     * @example
     * // Get one CropType
     * const cropType = await prisma.cropType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CropTypeFindUniqueArgs>(args: SelectSubset<T, CropTypeFindUniqueArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CropType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CropTypeFindUniqueOrThrowArgs} args - Arguments to find a CropType
     * @example
     * // Get one CropType
     * const cropType = await prisma.cropType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CropTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, CropTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CropType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeFindFirstArgs} args - Arguments to find a CropType
     * @example
     * // Get one CropType
     * const cropType = await prisma.cropType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CropTypeFindFirstArgs>(args?: SelectSubset<T, CropTypeFindFirstArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CropType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeFindFirstOrThrowArgs} args - Arguments to find a CropType
     * @example
     * // Get one CropType
     * const cropType = await prisma.cropType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CropTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, CropTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CropTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CropTypes
     * const cropTypes = await prisma.cropType.findMany()
     * 
     * // Get first 10 CropTypes
     * const cropTypes = await prisma.cropType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const cropTypeWithIdOnly = await prisma.cropType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CropTypeFindManyArgs>(args?: SelectSubset<T, CropTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CropType.
     * @param {CropTypeCreateArgs} args - Arguments to create a CropType.
     * @example
     * // Create one CropType
     * const CropType = await prisma.cropType.create({
     *   data: {
     *     // ... data to create a CropType
     *   }
     * })
     * 
     */
    create<T extends CropTypeCreateArgs>(args: SelectSubset<T, CropTypeCreateArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CropTypes.
     * @param {CropTypeCreateManyArgs} args - Arguments to create many CropTypes.
     * @example
     * // Create many CropTypes
     * const cropType = await prisma.cropType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CropTypeCreateManyArgs>(args?: SelectSubset<T, CropTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CropTypes and returns the data saved in the database.
     * @param {CropTypeCreateManyAndReturnArgs} args - Arguments to create many CropTypes.
     * @example
     * // Create many CropTypes
     * const cropType = await prisma.cropType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CropTypes and only return the `id`
     * const cropTypeWithIdOnly = await prisma.cropType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CropTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, CropTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CropType.
     * @param {CropTypeDeleteArgs} args - Arguments to delete one CropType.
     * @example
     * // Delete one CropType
     * const CropType = await prisma.cropType.delete({
     *   where: {
     *     // ... filter to delete one CropType
     *   }
     * })
     * 
     */
    delete<T extends CropTypeDeleteArgs>(args: SelectSubset<T, CropTypeDeleteArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CropType.
     * @param {CropTypeUpdateArgs} args - Arguments to update one CropType.
     * @example
     * // Update one CropType
     * const cropType = await prisma.cropType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CropTypeUpdateArgs>(args: SelectSubset<T, CropTypeUpdateArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CropTypes.
     * @param {CropTypeDeleteManyArgs} args - Arguments to filter CropTypes to delete.
     * @example
     * // Delete a few CropTypes
     * const { count } = await prisma.cropType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CropTypeDeleteManyArgs>(args?: SelectSubset<T, CropTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CropTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CropTypes
     * const cropType = await prisma.cropType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CropTypeUpdateManyArgs>(args: SelectSubset<T, CropTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CropTypes and returns the data updated in the database.
     * @param {CropTypeUpdateManyAndReturnArgs} args - Arguments to update many CropTypes.
     * @example
     * // Update many CropTypes
     * const cropType = await prisma.cropType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CropTypes and only return the `id`
     * const cropTypeWithIdOnly = await prisma.cropType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CropTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, CropTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CropType.
     * @param {CropTypeUpsertArgs} args - Arguments to update or create a CropType.
     * @example
     * // Update or create a CropType
     * const cropType = await prisma.cropType.upsert({
     *   create: {
     *     // ... data to create a CropType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CropType we want to update
     *   }
     * })
     */
    upsert<T extends CropTypeUpsertArgs>(args: SelectSubset<T, CropTypeUpsertArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CropTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeCountArgs} args - Arguments to filter CropTypes to count.
     * @example
     * // Count the number of CropTypes
     * const count = await prisma.cropType.count({
     *   where: {
     *     // ... the filter for the CropTypes we want to count
     *   }
     * })
    **/
    count<T extends CropTypeCountArgs>(
      args?: Subset<T, CropTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CropTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CropType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CropTypeAggregateArgs>(args: Subset<T, CropTypeAggregateArgs>): Prisma.PrismaPromise<GetCropTypeAggregateType<T>>

    /**
     * Group by CropType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CropTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CropTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CropTypeGroupByArgs['orderBy'] }
        : { orderBy?: CropTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CropTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCropTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CropType model
   */
  readonly fields: CropTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CropType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CropTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    listings<T extends CropType$listingsArgs<ExtArgs> = {}>(args?: Subset<T, CropType$listingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    marketPrices<T extends CropType$marketPricesArgs<ExtArgs> = {}>(args?: Subset<T, CropType$marketPricesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CropType model
   */
  interface CropTypeFieldRefs {
    readonly id: FieldRef<"CropType", 'String'>
    readonly name_en: FieldRef<"CropType", 'String'>
    readonly name_hi: FieldRef<"CropType", 'String'>
    readonly name_mr: FieldRef<"CropType", 'String'>
    readonly name_ta: FieldRef<"CropType", 'String'>
    readonly name_te: FieldRef<"CropType", 'String'>
    readonly name_kn: FieldRef<"CropType", 'String'>
    readonly name_ml: FieldRef<"CropType", 'String'>
    readonly name_pa: FieldRef<"CropType", 'String'>
    readonly name_es: FieldRef<"CropType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CropType findUnique
   */
  export type CropTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * Filter, which CropType to fetch.
     */
    where: CropTypeWhereUniqueInput
  }

  /**
   * CropType findUniqueOrThrow
   */
  export type CropTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * Filter, which CropType to fetch.
     */
    where: CropTypeWhereUniqueInput
  }

  /**
   * CropType findFirst
   */
  export type CropTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * Filter, which CropType to fetch.
     */
    where?: CropTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropTypes to fetch.
     */
    orderBy?: CropTypeOrderByWithRelationInput | CropTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CropTypes.
     */
    cursor?: CropTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CropTypes.
     */
    distinct?: CropTypeScalarFieldEnum | CropTypeScalarFieldEnum[]
  }

  /**
   * CropType findFirstOrThrow
   */
  export type CropTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * Filter, which CropType to fetch.
     */
    where?: CropTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropTypes to fetch.
     */
    orderBy?: CropTypeOrderByWithRelationInput | CropTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CropTypes.
     */
    cursor?: CropTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CropTypes.
     */
    distinct?: CropTypeScalarFieldEnum | CropTypeScalarFieldEnum[]
  }

  /**
   * CropType findMany
   */
  export type CropTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * Filter, which CropTypes to fetch.
     */
    where?: CropTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CropTypes to fetch.
     */
    orderBy?: CropTypeOrderByWithRelationInput | CropTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CropTypes.
     */
    cursor?: CropTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CropTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CropTypes.
     */
    skip?: number
    distinct?: CropTypeScalarFieldEnum | CropTypeScalarFieldEnum[]
  }

  /**
   * CropType create
   */
  export type CropTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a CropType.
     */
    data: XOR<CropTypeCreateInput, CropTypeUncheckedCreateInput>
  }

  /**
   * CropType createMany
   */
  export type CropTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CropTypes.
     */
    data: CropTypeCreateManyInput | CropTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CropType createManyAndReturn
   */
  export type CropTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * The data used to create many CropTypes.
     */
    data: CropTypeCreateManyInput | CropTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CropType update
   */
  export type CropTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a CropType.
     */
    data: XOR<CropTypeUpdateInput, CropTypeUncheckedUpdateInput>
    /**
     * Choose, which CropType to update.
     */
    where: CropTypeWhereUniqueInput
  }

  /**
   * CropType updateMany
   */
  export type CropTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CropTypes.
     */
    data: XOR<CropTypeUpdateManyMutationInput, CropTypeUncheckedUpdateManyInput>
    /**
     * Filter which CropTypes to update
     */
    where?: CropTypeWhereInput
    /**
     * Limit how many CropTypes to update.
     */
    limit?: number
  }

  /**
   * CropType updateManyAndReturn
   */
  export type CropTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * The data used to update CropTypes.
     */
    data: XOR<CropTypeUpdateManyMutationInput, CropTypeUncheckedUpdateManyInput>
    /**
     * Filter which CropTypes to update
     */
    where?: CropTypeWhereInput
    /**
     * Limit how many CropTypes to update.
     */
    limit?: number
  }

  /**
   * CropType upsert
   */
  export type CropTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the CropType to update in case it exists.
     */
    where: CropTypeWhereUniqueInput
    /**
     * In case the CropType found by the `where` argument doesn't exist, create a new CropType with this data.
     */
    create: XOR<CropTypeCreateInput, CropTypeUncheckedCreateInput>
    /**
     * In case the CropType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CropTypeUpdateInput, CropTypeUncheckedUpdateInput>
  }

  /**
   * CropType delete
   */
  export type CropTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
    /**
     * Filter which CropType to delete.
     */
    where: CropTypeWhereUniqueInput
  }

  /**
   * CropType deleteMany
   */
  export type CropTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CropTypes to delete
     */
    where?: CropTypeWhereInput
    /**
     * Limit how many CropTypes to delete.
     */
    limit?: number
  }

  /**
   * CropType.listings
   */
  export type CropType$listingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    where?: ProduceListingWhereInput
    orderBy?: ProduceListingOrderByWithRelationInput | ProduceListingOrderByWithRelationInput[]
    cursor?: ProduceListingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProduceListingScalarFieldEnum | ProduceListingScalarFieldEnum[]
  }

  /**
   * CropType.marketPrices
   */
  export type CropType$marketPricesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    where?: MarketPriceWhereInput
    orderBy?: MarketPriceOrderByWithRelationInput | MarketPriceOrderByWithRelationInput[]
    cursor?: MarketPriceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarketPriceScalarFieldEnum | MarketPriceScalarFieldEnum[]
  }

  /**
   * CropType without action
   */
  export type CropTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CropType
     */
    select?: CropTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CropType
     */
    omit?: CropTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CropTypeInclude<ExtArgs> | null
  }


  /**
   * Model ProduceListing
   */

  export type AggregateProduceListing = {
    _count: ProduceListingCountAggregateOutputType | null
    _min: ProduceListingMinAggregateOutputType | null
    _max: ProduceListingMaxAggregateOutputType | null
  }

  export type ProduceListingMinAggregateOutputType = {
    id: string | null
    sellerUserId: string | null
    cropTypeId: string | null
    quantity: string | null
    pricePerUnit: string | null
    description: string | null
    listingDate: Date | null
    isActive: boolean | null
  }

  export type ProduceListingMaxAggregateOutputType = {
    id: string | null
    sellerUserId: string | null
    cropTypeId: string | null
    quantity: string | null
    pricePerUnit: string | null
    description: string | null
    listingDate: Date | null
    isActive: boolean | null
  }

  export type ProduceListingCountAggregateOutputType = {
    id: number
    sellerUserId: number
    cropTypeId: number
    quantity: number
    pricePerUnit: number
    description: number
    listingDate: number
    isActive: number
    _all: number
  }


  export type ProduceListingMinAggregateInputType = {
    id?: true
    sellerUserId?: true
    cropTypeId?: true
    quantity?: true
    pricePerUnit?: true
    description?: true
    listingDate?: true
    isActive?: true
  }

  export type ProduceListingMaxAggregateInputType = {
    id?: true
    sellerUserId?: true
    cropTypeId?: true
    quantity?: true
    pricePerUnit?: true
    description?: true
    listingDate?: true
    isActive?: true
  }

  export type ProduceListingCountAggregateInputType = {
    id?: true
    sellerUserId?: true
    cropTypeId?: true
    quantity?: true
    pricePerUnit?: true
    description?: true
    listingDate?: true
    isActive?: true
    _all?: true
  }

  export type ProduceListingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProduceListing to aggregate.
     */
    where?: ProduceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceListings to fetch.
     */
    orderBy?: ProduceListingOrderByWithRelationInput | ProduceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProduceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProduceListings
    **/
    _count?: true | ProduceListingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProduceListingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProduceListingMaxAggregateInputType
  }

  export type GetProduceListingAggregateType<T extends ProduceListingAggregateArgs> = {
        [P in keyof T & keyof AggregateProduceListing]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduceListing[P]>
      : GetScalarType<T[P], AggregateProduceListing[P]>
  }




  export type ProduceListingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProduceListingWhereInput
    orderBy?: ProduceListingOrderByWithAggregationInput | ProduceListingOrderByWithAggregationInput[]
    by: ProduceListingScalarFieldEnum[] | ProduceListingScalarFieldEnum
    having?: ProduceListingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProduceListingCountAggregateInputType | true
    _min?: ProduceListingMinAggregateInputType
    _max?: ProduceListingMaxAggregateInputType
  }

  export type ProduceListingGroupByOutputType = {
    id: string
    sellerUserId: string
    cropTypeId: string
    quantity: string
    pricePerUnit: string
    description: string | null
    listingDate: Date
    isActive: boolean
    _count: ProduceListingCountAggregateOutputType | null
    _min: ProduceListingMinAggregateOutputType | null
    _max: ProduceListingMaxAggregateOutputType | null
  }

  type GetProduceListingGroupByPayload<T extends ProduceListingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProduceListingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProduceListingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProduceListingGroupByOutputType[P]>
            : GetScalarType<T[P], ProduceListingGroupByOutputType[P]>
        }
      >
    >


  export type ProduceListingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sellerUserId?: boolean
    cropTypeId?: boolean
    quantity?: boolean
    pricePerUnit?: boolean
    description?: boolean
    listingDate?: boolean
    isActive?: boolean
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produceListing"]>

  export type ProduceListingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sellerUserId?: boolean
    cropTypeId?: boolean
    quantity?: boolean
    pricePerUnit?: boolean
    description?: boolean
    listingDate?: boolean
    isActive?: boolean
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produceListing"]>

  export type ProduceListingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sellerUserId?: boolean
    cropTypeId?: boolean
    quantity?: boolean
    pricePerUnit?: boolean
    description?: boolean
    listingDate?: boolean
    isActive?: boolean
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["produceListing"]>

  export type ProduceListingSelectScalar = {
    id?: boolean
    sellerUserId?: boolean
    cropTypeId?: boolean
    quantity?: boolean
    pricePerUnit?: boolean
    description?: boolean
    listingDate?: boolean
    isActive?: boolean
  }

  export type ProduceListingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sellerUserId" | "cropTypeId" | "quantity" | "pricePerUnit" | "description" | "listingDate" | "isActive", ExtArgs["result"]["produceListing"]>
  export type ProduceListingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }
  export type ProduceListingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }
  export type ProduceListingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }

  export type $ProduceListingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProduceListing"
    objects: {
      cropType: Prisma.$CropTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sellerUserId: string
      cropTypeId: string
      quantity: string
      pricePerUnit: string
      description: string | null
      listingDate: Date
      isActive: boolean
    }, ExtArgs["result"]["produceListing"]>
    composites: {}
  }

  type ProduceListingGetPayload<S extends boolean | null | undefined | ProduceListingDefaultArgs> = $Result.GetResult<Prisma.$ProduceListingPayload, S>

  type ProduceListingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProduceListingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProduceListingCountAggregateInputType | true
    }

  export interface ProduceListingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProduceListing'], meta: { name: 'ProduceListing' } }
    /**
     * Find zero or one ProduceListing that matches the filter.
     * @param {ProduceListingFindUniqueArgs} args - Arguments to find a ProduceListing
     * @example
     * // Get one ProduceListing
     * const produceListing = await prisma.produceListing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProduceListingFindUniqueArgs>(args: SelectSubset<T, ProduceListingFindUniqueArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProduceListing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProduceListingFindUniqueOrThrowArgs} args - Arguments to find a ProduceListing
     * @example
     * // Get one ProduceListing
     * const produceListing = await prisma.produceListing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProduceListingFindUniqueOrThrowArgs>(args: SelectSubset<T, ProduceListingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProduceListing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingFindFirstArgs} args - Arguments to find a ProduceListing
     * @example
     * // Get one ProduceListing
     * const produceListing = await prisma.produceListing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProduceListingFindFirstArgs>(args?: SelectSubset<T, ProduceListingFindFirstArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProduceListing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingFindFirstOrThrowArgs} args - Arguments to find a ProduceListing
     * @example
     * // Get one ProduceListing
     * const produceListing = await prisma.produceListing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProduceListingFindFirstOrThrowArgs>(args?: SelectSubset<T, ProduceListingFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProduceListings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProduceListings
     * const produceListings = await prisma.produceListing.findMany()
     * 
     * // Get first 10 ProduceListings
     * const produceListings = await prisma.produceListing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const produceListingWithIdOnly = await prisma.produceListing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProduceListingFindManyArgs>(args?: SelectSubset<T, ProduceListingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProduceListing.
     * @param {ProduceListingCreateArgs} args - Arguments to create a ProduceListing.
     * @example
     * // Create one ProduceListing
     * const ProduceListing = await prisma.produceListing.create({
     *   data: {
     *     // ... data to create a ProduceListing
     *   }
     * })
     * 
     */
    create<T extends ProduceListingCreateArgs>(args: SelectSubset<T, ProduceListingCreateArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProduceListings.
     * @param {ProduceListingCreateManyArgs} args - Arguments to create many ProduceListings.
     * @example
     * // Create many ProduceListings
     * const produceListing = await prisma.produceListing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProduceListingCreateManyArgs>(args?: SelectSubset<T, ProduceListingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProduceListings and returns the data saved in the database.
     * @param {ProduceListingCreateManyAndReturnArgs} args - Arguments to create many ProduceListings.
     * @example
     * // Create many ProduceListings
     * const produceListing = await prisma.produceListing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProduceListings and only return the `id`
     * const produceListingWithIdOnly = await prisma.produceListing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProduceListingCreateManyAndReturnArgs>(args?: SelectSubset<T, ProduceListingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ProduceListing.
     * @param {ProduceListingDeleteArgs} args - Arguments to delete one ProduceListing.
     * @example
     * // Delete one ProduceListing
     * const ProduceListing = await prisma.produceListing.delete({
     *   where: {
     *     // ... filter to delete one ProduceListing
     *   }
     * })
     * 
     */
    delete<T extends ProduceListingDeleteArgs>(args: SelectSubset<T, ProduceListingDeleteArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProduceListing.
     * @param {ProduceListingUpdateArgs} args - Arguments to update one ProduceListing.
     * @example
     * // Update one ProduceListing
     * const produceListing = await prisma.produceListing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProduceListingUpdateArgs>(args: SelectSubset<T, ProduceListingUpdateArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProduceListings.
     * @param {ProduceListingDeleteManyArgs} args - Arguments to filter ProduceListings to delete.
     * @example
     * // Delete a few ProduceListings
     * const { count } = await prisma.produceListing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProduceListingDeleteManyArgs>(args?: SelectSubset<T, ProduceListingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProduceListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProduceListings
     * const produceListing = await prisma.produceListing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProduceListingUpdateManyArgs>(args: SelectSubset<T, ProduceListingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProduceListings and returns the data updated in the database.
     * @param {ProduceListingUpdateManyAndReturnArgs} args - Arguments to update many ProduceListings.
     * @example
     * // Update many ProduceListings
     * const produceListing = await prisma.produceListing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ProduceListings and only return the `id`
     * const produceListingWithIdOnly = await prisma.produceListing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProduceListingUpdateManyAndReturnArgs>(args: SelectSubset<T, ProduceListingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ProduceListing.
     * @param {ProduceListingUpsertArgs} args - Arguments to update or create a ProduceListing.
     * @example
     * // Update or create a ProduceListing
     * const produceListing = await prisma.produceListing.upsert({
     *   create: {
     *     // ... data to create a ProduceListing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProduceListing we want to update
     *   }
     * })
     */
    upsert<T extends ProduceListingUpsertArgs>(args: SelectSubset<T, ProduceListingUpsertArgs<ExtArgs>>): Prisma__ProduceListingClient<$Result.GetResult<Prisma.$ProduceListingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProduceListings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingCountArgs} args - Arguments to filter ProduceListings to count.
     * @example
     * // Count the number of ProduceListings
     * const count = await prisma.produceListing.count({
     *   where: {
     *     // ... the filter for the ProduceListings we want to count
     *   }
     * })
    **/
    count<T extends ProduceListingCountArgs>(
      args?: Subset<T, ProduceListingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProduceListingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProduceListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProduceListingAggregateArgs>(args: Subset<T, ProduceListingAggregateArgs>): Prisma.PrismaPromise<GetProduceListingAggregateType<T>>

    /**
     * Group by ProduceListing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProduceListingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProduceListingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProduceListingGroupByArgs['orderBy'] }
        : { orderBy?: ProduceListingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProduceListingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProduceListingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProduceListing model
   */
  readonly fields: ProduceListingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProduceListing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProduceListingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cropType<T extends CropTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CropTypeDefaultArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProduceListing model
   */
  interface ProduceListingFieldRefs {
    readonly id: FieldRef<"ProduceListing", 'String'>
    readonly sellerUserId: FieldRef<"ProduceListing", 'String'>
    readonly cropTypeId: FieldRef<"ProduceListing", 'String'>
    readonly quantity: FieldRef<"ProduceListing", 'String'>
    readonly pricePerUnit: FieldRef<"ProduceListing", 'String'>
    readonly description: FieldRef<"ProduceListing", 'String'>
    readonly listingDate: FieldRef<"ProduceListing", 'DateTime'>
    readonly isActive: FieldRef<"ProduceListing", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * ProduceListing findUnique
   */
  export type ProduceListingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * Filter, which ProduceListing to fetch.
     */
    where: ProduceListingWhereUniqueInput
  }

  /**
   * ProduceListing findUniqueOrThrow
   */
  export type ProduceListingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * Filter, which ProduceListing to fetch.
     */
    where: ProduceListingWhereUniqueInput
  }

  /**
   * ProduceListing findFirst
   */
  export type ProduceListingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * Filter, which ProduceListing to fetch.
     */
    where?: ProduceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceListings to fetch.
     */
    orderBy?: ProduceListingOrderByWithRelationInput | ProduceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProduceListings.
     */
    cursor?: ProduceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProduceListings.
     */
    distinct?: ProduceListingScalarFieldEnum | ProduceListingScalarFieldEnum[]
  }

  /**
   * ProduceListing findFirstOrThrow
   */
  export type ProduceListingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * Filter, which ProduceListing to fetch.
     */
    where?: ProduceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceListings to fetch.
     */
    orderBy?: ProduceListingOrderByWithRelationInput | ProduceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProduceListings.
     */
    cursor?: ProduceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceListings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProduceListings.
     */
    distinct?: ProduceListingScalarFieldEnum | ProduceListingScalarFieldEnum[]
  }

  /**
   * ProduceListing findMany
   */
  export type ProduceListingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * Filter, which ProduceListings to fetch.
     */
    where?: ProduceListingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProduceListings to fetch.
     */
    orderBy?: ProduceListingOrderByWithRelationInput | ProduceListingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProduceListings.
     */
    cursor?: ProduceListingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProduceListings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProduceListings.
     */
    skip?: number
    distinct?: ProduceListingScalarFieldEnum | ProduceListingScalarFieldEnum[]
  }

  /**
   * ProduceListing create
   */
  export type ProduceListingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * The data needed to create a ProduceListing.
     */
    data: XOR<ProduceListingCreateInput, ProduceListingUncheckedCreateInput>
  }

  /**
   * ProduceListing createMany
   */
  export type ProduceListingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProduceListings.
     */
    data: ProduceListingCreateManyInput | ProduceListingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProduceListing createManyAndReturn
   */
  export type ProduceListingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * The data used to create many ProduceListings.
     */
    data: ProduceListingCreateManyInput | ProduceListingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProduceListing update
   */
  export type ProduceListingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * The data needed to update a ProduceListing.
     */
    data: XOR<ProduceListingUpdateInput, ProduceListingUncheckedUpdateInput>
    /**
     * Choose, which ProduceListing to update.
     */
    where: ProduceListingWhereUniqueInput
  }

  /**
   * ProduceListing updateMany
   */
  export type ProduceListingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProduceListings.
     */
    data: XOR<ProduceListingUpdateManyMutationInput, ProduceListingUncheckedUpdateManyInput>
    /**
     * Filter which ProduceListings to update
     */
    where?: ProduceListingWhereInput
    /**
     * Limit how many ProduceListings to update.
     */
    limit?: number
  }

  /**
   * ProduceListing updateManyAndReturn
   */
  export type ProduceListingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * The data used to update ProduceListings.
     */
    data: XOR<ProduceListingUpdateManyMutationInput, ProduceListingUncheckedUpdateManyInput>
    /**
     * Filter which ProduceListings to update
     */
    where?: ProduceListingWhereInput
    /**
     * Limit how many ProduceListings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProduceListing upsert
   */
  export type ProduceListingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * The filter to search for the ProduceListing to update in case it exists.
     */
    where: ProduceListingWhereUniqueInput
    /**
     * In case the ProduceListing found by the `where` argument doesn't exist, create a new ProduceListing with this data.
     */
    create: XOR<ProduceListingCreateInput, ProduceListingUncheckedCreateInput>
    /**
     * In case the ProduceListing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProduceListingUpdateInput, ProduceListingUncheckedUpdateInput>
  }

  /**
   * ProduceListing delete
   */
  export type ProduceListingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
    /**
     * Filter which ProduceListing to delete.
     */
    where: ProduceListingWhereUniqueInput
  }

  /**
   * ProduceListing deleteMany
   */
  export type ProduceListingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProduceListings to delete
     */
    where?: ProduceListingWhereInput
    /**
     * Limit how many ProduceListings to delete.
     */
    limit?: number
  }

  /**
   * ProduceListing without action
   */
  export type ProduceListingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProduceListing
     */
    select?: ProduceListingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProduceListing
     */
    omit?: ProduceListingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProduceListingInclude<ExtArgs> | null
  }


  /**
   * Model MarketPrice
   */

  export type AggregateMarketPrice = {
    _count: MarketPriceCountAggregateOutputType | null
    _min: MarketPriceMinAggregateOutputType | null
    _max: MarketPriceMaxAggregateOutputType | null
  }

  export type MarketPriceMinAggregateOutputType = {
    id: string | null
    cropTypeId: string | null
    marketName: string | null
    price: string | null
    unit: string | null
    date: Date | null
    source: string | null
    location: string | null
  }

  export type MarketPriceMaxAggregateOutputType = {
    id: string | null
    cropTypeId: string | null
    marketName: string | null
    price: string | null
    unit: string | null
    date: Date | null
    source: string | null
    location: string | null
  }

  export type MarketPriceCountAggregateOutputType = {
    id: number
    cropTypeId: number
    marketName: number
    price: number
    unit: number
    date: number
    source: number
    location: number
    _all: number
  }


  export type MarketPriceMinAggregateInputType = {
    id?: true
    cropTypeId?: true
    marketName?: true
    price?: true
    unit?: true
    date?: true
    source?: true
    location?: true
  }

  export type MarketPriceMaxAggregateInputType = {
    id?: true
    cropTypeId?: true
    marketName?: true
    price?: true
    unit?: true
    date?: true
    source?: true
    location?: true
  }

  export type MarketPriceCountAggregateInputType = {
    id?: true
    cropTypeId?: true
    marketName?: true
    price?: true
    unit?: true
    date?: true
    source?: true
    location?: true
    _all?: true
  }

  export type MarketPriceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketPrice to aggregate.
     */
    where?: MarketPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketPrices to fetch.
     */
    orderBy?: MarketPriceOrderByWithRelationInput | MarketPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarketPrices
    **/
    _count?: true | MarketPriceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketPriceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketPriceMaxAggregateInputType
  }

  export type GetMarketPriceAggregateType<T extends MarketPriceAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketPrice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketPrice[P]>
      : GetScalarType<T[P], AggregateMarketPrice[P]>
  }




  export type MarketPriceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketPriceWhereInput
    orderBy?: MarketPriceOrderByWithAggregationInput | MarketPriceOrderByWithAggregationInput[]
    by: MarketPriceScalarFieldEnum[] | MarketPriceScalarFieldEnum
    having?: MarketPriceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketPriceCountAggregateInputType | true
    _min?: MarketPriceMinAggregateInputType
    _max?: MarketPriceMaxAggregateInputType
  }

  export type MarketPriceGroupByOutputType = {
    id: string
    cropTypeId: string
    marketName: string
    price: string
    unit: string
    date: Date
    source: string | null
    location: string | null
    _count: MarketPriceCountAggregateOutputType | null
    _min: MarketPriceMinAggregateOutputType | null
    _max: MarketPriceMaxAggregateOutputType | null
  }

  type GetMarketPriceGroupByPayload<T extends MarketPriceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketPriceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketPriceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketPriceGroupByOutputType[P]>
            : GetScalarType<T[P], MarketPriceGroupByOutputType[P]>
        }
      >
    >


  export type MarketPriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropTypeId?: boolean
    marketName?: boolean
    price?: boolean
    unit?: boolean
    date?: boolean
    source?: boolean
    location?: boolean
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketPrice"]>

  export type MarketPriceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropTypeId?: boolean
    marketName?: boolean
    price?: boolean
    unit?: boolean
    date?: boolean
    source?: boolean
    location?: boolean
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketPrice"]>

  export type MarketPriceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    cropTypeId?: boolean
    marketName?: boolean
    price?: boolean
    unit?: boolean
    date?: boolean
    source?: boolean
    location?: boolean
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["marketPrice"]>

  export type MarketPriceSelectScalar = {
    id?: boolean
    cropTypeId?: boolean
    marketName?: boolean
    price?: boolean
    unit?: boolean
    date?: boolean
    source?: boolean
    location?: boolean
  }

  export type MarketPriceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "cropTypeId" | "marketName" | "price" | "unit" | "date" | "source" | "location", ExtArgs["result"]["marketPrice"]>
  export type MarketPriceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }
  export type MarketPriceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }
  export type MarketPriceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    cropType?: boolean | CropTypeDefaultArgs<ExtArgs>
  }

  export type $MarketPricePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarketPrice"
    objects: {
      cropType: Prisma.$CropTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      cropTypeId: string
      marketName: string
      price: string
      unit: string
      date: Date
      source: string | null
      location: string | null
    }, ExtArgs["result"]["marketPrice"]>
    composites: {}
  }

  type MarketPriceGetPayload<S extends boolean | null | undefined | MarketPriceDefaultArgs> = $Result.GetResult<Prisma.$MarketPricePayload, S>

  type MarketPriceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketPriceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketPriceCountAggregateInputType | true
    }

  export interface MarketPriceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarketPrice'], meta: { name: 'MarketPrice' } }
    /**
     * Find zero or one MarketPrice that matches the filter.
     * @param {MarketPriceFindUniqueArgs} args - Arguments to find a MarketPrice
     * @example
     * // Get one MarketPrice
     * const marketPrice = await prisma.marketPrice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketPriceFindUniqueArgs>(args: SelectSubset<T, MarketPriceFindUniqueArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MarketPrice that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketPriceFindUniqueOrThrowArgs} args - Arguments to find a MarketPrice
     * @example
     * // Get one MarketPrice
     * const marketPrice = await prisma.marketPrice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketPriceFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketPriceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketPrice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceFindFirstArgs} args - Arguments to find a MarketPrice
     * @example
     * // Get one MarketPrice
     * const marketPrice = await prisma.marketPrice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketPriceFindFirstArgs>(args?: SelectSubset<T, MarketPriceFindFirstArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketPrice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceFindFirstOrThrowArgs} args - Arguments to find a MarketPrice
     * @example
     * // Get one MarketPrice
     * const marketPrice = await prisma.marketPrice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketPriceFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketPriceFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MarketPrices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketPrices
     * const marketPrices = await prisma.marketPrice.findMany()
     * 
     * // Get first 10 MarketPrices
     * const marketPrices = await prisma.marketPrice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketPriceWithIdOnly = await prisma.marketPrice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketPriceFindManyArgs>(args?: SelectSubset<T, MarketPriceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MarketPrice.
     * @param {MarketPriceCreateArgs} args - Arguments to create a MarketPrice.
     * @example
     * // Create one MarketPrice
     * const MarketPrice = await prisma.marketPrice.create({
     *   data: {
     *     // ... data to create a MarketPrice
     *   }
     * })
     * 
     */
    create<T extends MarketPriceCreateArgs>(args: SelectSubset<T, MarketPriceCreateArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MarketPrices.
     * @param {MarketPriceCreateManyArgs} args - Arguments to create many MarketPrices.
     * @example
     * // Create many MarketPrices
     * const marketPrice = await prisma.marketPrice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketPriceCreateManyArgs>(args?: SelectSubset<T, MarketPriceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MarketPrices and returns the data saved in the database.
     * @param {MarketPriceCreateManyAndReturnArgs} args - Arguments to create many MarketPrices.
     * @example
     * // Create many MarketPrices
     * const marketPrice = await prisma.marketPrice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MarketPrices and only return the `id`
     * const marketPriceWithIdOnly = await prisma.marketPrice.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketPriceCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketPriceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MarketPrice.
     * @param {MarketPriceDeleteArgs} args - Arguments to delete one MarketPrice.
     * @example
     * // Delete one MarketPrice
     * const MarketPrice = await prisma.marketPrice.delete({
     *   where: {
     *     // ... filter to delete one MarketPrice
     *   }
     * })
     * 
     */
    delete<T extends MarketPriceDeleteArgs>(args: SelectSubset<T, MarketPriceDeleteArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MarketPrice.
     * @param {MarketPriceUpdateArgs} args - Arguments to update one MarketPrice.
     * @example
     * // Update one MarketPrice
     * const marketPrice = await prisma.marketPrice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketPriceUpdateArgs>(args: SelectSubset<T, MarketPriceUpdateArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MarketPrices.
     * @param {MarketPriceDeleteManyArgs} args - Arguments to filter MarketPrices to delete.
     * @example
     * // Delete a few MarketPrices
     * const { count } = await prisma.marketPrice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketPriceDeleteManyArgs>(args?: SelectSubset<T, MarketPriceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketPrices
     * const marketPrice = await prisma.marketPrice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketPriceUpdateManyArgs>(args: SelectSubset<T, MarketPriceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketPrices and returns the data updated in the database.
     * @param {MarketPriceUpdateManyAndReturnArgs} args - Arguments to update many MarketPrices.
     * @example
     * // Update many MarketPrices
     * const marketPrice = await prisma.marketPrice.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MarketPrices and only return the `id`
     * const marketPriceWithIdOnly = await prisma.marketPrice.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketPriceUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketPriceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MarketPrice.
     * @param {MarketPriceUpsertArgs} args - Arguments to update or create a MarketPrice.
     * @example
     * // Update or create a MarketPrice
     * const marketPrice = await prisma.marketPrice.upsert({
     *   create: {
     *     // ... data to create a MarketPrice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketPrice we want to update
     *   }
     * })
     */
    upsert<T extends MarketPriceUpsertArgs>(args: SelectSubset<T, MarketPriceUpsertArgs<ExtArgs>>): Prisma__MarketPriceClient<$Result.GetResult<Prisma.$MarketPricePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MarketPrices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceCountArgs} args - Arguments to filter MarketPrices to count.
     * @example
     * // Count the number of MarketPrices
     * const count = await prisma.marketPrice.count({
     *   where: {
     *     // ... the filter for the MarketPrices we want to count
     *   }
     * })
    **/
    count<T extends MarketPriceCountArgs>(
      args?: Subset<T, MarketPriceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketPriceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarketPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketPriceAggregateArgs>(args: Subset<T, MarketPriceAggregateArgs>): Prisma.PrismaPromise<GetMarketPriceAggregateType<T>>

    /**
     * Group by MarketPrice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketPriceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketPriceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketPriceGroupByArgs['orderBy'] }
        : { orderBy?: MarketPriceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketPriceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketPriceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarketPrice model
   */
  readonly fields: MarketPriceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarketPrice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketPriceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    cropType<T extends CropTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CropTypeDefaultArgs<ExtArgs>>): Prisma__CropTypeClient<$Result.GetResult<Prisma.$CropTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MarketPrice model
   */
  interface MarketPriceFieldRefs {
    readonly id: FieldRef<"MarketPrice", 'String'>
    readonly cropTypeId: FieldRef<"MarketPrice", 'String'>
    readonly marketName: FieldRef<"MarketPrice", 'String'>
    readonly price: FieldRef<"MarketPrice", 'String'>
    readonly unit: FieldRef<"MarketPrice", 'String'>
    readonly date: FieldRef<"MarketPrice", 'DateTime'>
    readonly source: FieldRef<"MarketPrice", 'String'>
    readonly location: FieldRef<"MarketPrice", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MarketPrice findUnique
   */
  export type MarketPriceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * Filter, which MarketPrice to fetch.
     */
    where: MarketPriceWhereUniqueInput
  }

  /**
   * MarketPrice findUniqueOrThrow
   */
  export type MarketPriceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * Filter, which MarketPrice to fetch.
     */
    where: MarketPriceWhereUniqueInput
  }

  /**
   * MarketPrice findFirst
   */
  export type MarketPriceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * Filter, which MarketPrice to fetch.
     */
    where?: MarketPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketPrices to fetch.
     */
    orderBy?: MarketPriceOrderByWithRelationInput | MarketPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketPrices.
     */
    cursor?: MarketPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketPrices.
     */
    distinct?: MarketPriceScalarFieldEnum | MarketPriceScalarFieldEnum[]
  }

  /**
   * MarketPrice findFirstOrThrow
   */
  export type MarketPriceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * Filter, which MarketPrice to fetch.
     */
    where?: MarketPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketPrices to fetch.
     */
    orderBy?: MarketPriceOrderByWithRelationInput | MarketPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketPrices.
     */
    cursor?: MarketPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketPrices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketPrices.
     */
    distinct?: MarketPriceScalarFieldEnum | MarketPriceScalarFieldEnum[]
  }

  /**
   * MarketPrice findMany
   */
  export type MarketPriceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * Filter, which MarketPrices to fetch.
     */
    where?: MarketPriceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketPrices to fetch.
     */
    orderBy?: MarketPriceOrderByWithRelationInput | MarketPriceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarketPrices.
     */
    cursor?: MarketPriceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketPrices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketPrices.
     */
    skip?: number
    distinct?: MarketPriceScalarFieldEnum | MarketPriceScalarFieldEnum[]
  }

  /**
   * MarketPrice create
   */
  export type MarketPriceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * The data needed to create a MarketPrice.
     */
    data: XOR<MarketPriceCreateInput, MarketPriceUncheckedCreateInput>
  }

  /**
   * MarketPrice createMany
   */
  export type MarketPriceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketPrices.
     */
    data: MarketPriceCreateManyInput | MarketPriceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MarketPrice createManyAndReturn
   */
  export type MarketPriceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * The data used to create many MarketPrices.
     */
    data: MarketPriceCreateManyInput | MarketPriceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MarketPrice update
   */
  export type MarketPriceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * The data needed to update a MarketPrice.
     */
    data: XOR<MarketPriceUpdateInput, MarketPriceUncheckedUpdateInput>
    /**
     * Choose, which MarketPrice to update.
     */
    where: MarketPriceWhereUniqueInput
  }

  /**
   * MarketPrice updateMany
   */
  export type MarketPriceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketPrices.
     */
    data: XOR<MarketPriceUpdateManyMutationInput, MarketPriceUncheckedUpdateManyInput>
    /**
     * Filter which MarketPrices to update
     */
    where?: MarketPriceWhereInput
    /**
     * Limit how many MarketPrices to update.
     */
    limit?: number
  }

  /**
   * MarketPrice updateManyAndReturn
   */
  export type MarketPriceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * The data used to update MarketPrices.
     */
    data: XOR<MarketPriceUpdateManyMutationInput, MarketPriceUncheckedUpdateManyInput>
    /**
     * Filter which MarketPrices to update
     */
    where?: MarketPriceWhereInput
    /**
     * Limit how many MarketPrices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MarketPrice upsert
   */
  export type MarketPriceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * The filter to search for the MarketPrice to update in case it exists.
     */
    where: MarketPriceWhereUniqueInput
    /**
     * In case the MarketPrice found by the `where` argument doesn't exist, create a new MarketPrice with this data.
     */
    create: XOR<MarketPriceCreateInput, MarketPriceUncheckedCreateInput>
    /**
     * In case the MarketPrice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketPriceUpdateInput, MarketPriceUncheckedUpdateInput>
  }

  /**
   * MarketPrice delete
   */
  export type MarketPriceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
    /**
     * Filter which MarketPrice to delete.
     */
    where: MarketPriceWhereUniqueInput
  }

  /**
   * MarketPrice deleteMany
   */
  export type MarketPriceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketPrices to delete
     */
    where?: MarketPriceWhereInput
    /**
     * Limit how many MarketPrices to delete.
     */
    limit?: number
  }

  /**
   * MarketPrice without action
   */
  export type MarketPriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketPrice
     */
    select?: MarketPriceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketPrice
     */
    omit?: MarketPriceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarketPriceInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CropTypeScalarFieldEnum: {
    id: 'id',
    name_en: 'name_en',
    name_hi: 'name_hi',
    name_mr: 'name_mr',
    name_ta: 'name_ta',
    name_te: 'name_te',
    name_kn: 'name_kn',
    name_ml: 'name_ml',
    name_pa: 'name_pa',
    name_es: 'name_es'
  };

  export type CropTypeScalarFieldEnum = (typeof CropTypeScalarFieldEnum)[keyof typeof CropTypeScalarFieldEnum]


  export const ProduceListingScalarFieldEnum: {
    id: 'id',
    sellerUserId: 'sellerUserId',
    cropTypeId: 'cropTypeId',
    quantity: 'quantity',
    pricePerUnit: 'pricePerUnit',
    description: 'description',
    listingDate: 'listingDate',
    isActive: 'isActive'
  };

  export type ProduceListingScalarFieldEnum = (typeof ProduceListingScalarFieldEnum)[keyof typeof ProduceListingScalarFieldEnum]


  export const MarketPriceScalarFieldEnum: {
    id: 'id',
    cropTypeId: 'cropTypeId',
    marketName: 'marketName',
    price: 'price',
    unit: 'unit',
    date: 'date',
    source: 'source',
    location: 'location'
  };

  export type MarketPriceScalarFieldEnum = (typeof MarketPriceScalarFieldEnum)[keyof typeof MarketPriceScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type CropTypeWhereInput = {
    AND?: CropTypeWhereInput | CropTypeWhereInput[]
    OR?: CropTypeWhereInput[]
    NOT?: CropTypeWhereInput | CropTypeWhereInput[]
    id?: StringFilter<"CropType"> | string
    name_en?: StringFilter<"CropType"> | string
    name_hi?: StringNullableFilter<"CropType"> | string | null
    name_mr?: StringNullableFilter<"CropType"> | string | null
    name_ta?: StringNullableFilter<"CropType"> | string | null
    name_te?: StringNullableFilter<"CropType"> | string | null
    name_kn?: StringNullableFilter<"CropType"> | string | null
    name_ml?: StringNullableFilter<"CropType"> | string | null
    name_pa?: StringNullableFilter<"CropType"> | string | null
    name_es?: StringNullableFilter<"CropType"> | string | null
    listings?: ProduceListingListRelationFilter
    marketPrices?: MarketPriceListRelationFilter
  }

  export type CropTypeOrderByWithRelationInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_hi?: SortOrderInput | SortOrder
    name_mr?: SortOrderInput | SortOrder
    name_ta?: SortOrderInput | SortOrder
    name_te?: SortOrderInput | SortOrder
    name_kn?: SortOrderInput | SortOrder
    name_ml?: SortOrderInput | SortOrder
    name_pa?: SortOrderInput | SortOrder
    name_es?: SortOrderInput | SortOrder
    listings?: ProduceListingOrderByRelationAggregateInput
    marketPrices?: MarketPriceOrderByRelationAggregateInput
  }

  export type CropTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CropTypeWhereInput | CropTypeWhereInput[]
    OR?: CropTypeWhereInput[]
    NOT?: CropTypeWhereInput | CropTypeWhereInput[]
    name_en?: StringFilter<"CropType"> | string
    name_hi?: StringNullableFilter<"CropType"> | string | null
    name_mr?: StringNullableFilter<"CropType"> | string | null
    name_ta?: StringNullableFilter<"CropType"> | string | null
    name_te?: StringNullableFilter<"CropType"> | string | null
    name_kn?: StringNullableFilter<"CropType"> | string | null
    name_ml?: StringNullableFilter<"CropType"> | string | null
    name_pa?: StringNullableFilter<"CropType"> | string | null
    name_es?: StringNullableFilter<"CropType"> | string | null
    listings?: ProduceListingListRelationFilter
    marketPrices?: MarketPriceListRelationFilter
  }, "id">

  export type CropTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_hi?: SortOrderInput | SortOrder
    name_mr?: SortOrderInput | SortOrder
    name_ta?: SortOrderInput | SortOrder
    name_te?: SortOrderInput | SortOrder
    name_kn?: SortOrderInput | SortOrder
    name_ml?: SortOrderInput | SortOrder
    name_pa?: SortOrderInput | SortOrder
    name_es?: SortOrderInput | SortOrder
    _count?: CropTypeCountOrderByAggregateInput
    _max?: CropTypeMaxOrderByAggregateInput
    _min?: CropTypeMinOrderByAggregateInput
  }

  export type CropTypeScalarWhereWithAggregatesInput = {
    AND?: CropTypeScalarWhereWithAggregatesInput | CropTypeScalarWhereWithAggregatesInput[]
    OR?: CropTypeScalarWhereWithAggregatesInput[]
    NOT?: CropTypeScalarWhereWithAggregatesInput | CropTypeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CropType"> | string
    name_en?: StringWithAggregatesFilter<"CropType"> | string
    name_hi?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_mr?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_ta?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_te?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_kn?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_ml?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_pa?: StringNullableWithAggregatesFilter<"CropType"> | string | null
    name_es?: StringNullableWithAggregatesFilter<"CropType"> | string | null
  }

  export type ProduceListingWhereInput = {
    AND?: ProduceListingWhereInput | ProduceListingWhereInput[]
    OR?: ProduceListingWhereInput[]
    NOT?: ProduceListingWhereInput | ProduceListingWhereInput[]
    id?: StringFilter<"ProduceListing"> | string
    sellerUserId?: StringFilter<"ProduceListing"> | string
    cropTypeId?: StringFilter<"ProduceListing"> | string
    quantity?: StringFilter<"ProduceListing"> | string
    pricePerUnit?: StringFilter<"ProduceListing"> | string
    description?: StringNullableFilter<"ProduceListing"> | string | null
    listingDate?: DateTimeFilter<"ProduceListing"> | Date | string
    isActive?: BoolFilter<"ProduceListing"> | boolean
    cropType?: XOR<CropTypeScalarRelationFilter, CropTypeWhereInput>
  }

  export type ProduceListingOrderByWithRelationInput = {
    id?: SortOrder
    sellerUserId?: SortOrder
    cropTypeId?: SortOrder
    quantity?: SortOrder
    pricePerUnit?: SortOrder
    description?: SortOrderInput | SortOrder
    listingDate?: SortOrder
    isActive?: SortOrder
    cropType?: CropTypeOrderByWithRelationInput
  }

  export type ProduceListingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProduceListingWhereInput | ProduceListingWhereInput[]
    OR?: ProduceListingWhereInput[]
    NOT?: ProduceListingWhereInput | ProduceListingWhereInput[]
    sellerUserId?: StringFilter<"ProduceListing"> | string
    cropTypeId?: StringFilter<"ProduceListing"> | string
    quantity?: StringFilter<"ProduceListing"> | string
    pricePerUnit?: StringFilter<"ProduceListing"> | string
    description?: StringNullableFilter<"ProduceListing"> | string | null
    listingDate?: DateTimeFilter<"ProduceListing"> | Date | string
    isActive?: BoolFilter<"ProduceListing"> | boolean
    cropType?: XOR<CropTypeScalarRelationFilter, CropTypeWhereInput>
  }, "id">

  export type ProduceListingOrderByWithAggregationInput = {
    id?: SortOrder
    sellerUserId?: SortOrder
    cropTypeId?: SortOrder
    quantity?: SortOrder
    pricePerUnit?: SortOrder
    description?: SortOrderInput | SortOrder
    listingDate?: SortOrder
    isActive?: SortOrder
    _count?: ProduceListingCountOrderByAggregateInput
    _max?: ProduceListingMaxOrderByAggregateInput
    _min?: ProduceListingMinOrderByAggregateInput
  }

  export type ProduceListingScalarWhereWithAggregatesInput = {
    AND?: ProduceListingScalarWhereWithAggregatesInput | ProduceListingScalarWhereWithAggregatesInput[]
    OR?: ProduceListingScalarWhereWithAggregatesInput[]
    NOT?: ProduceListingScalarWhereWithAggregatesInput | ProduceListingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProduceListing"> | string
    sellerUserId?: StringWithAggregatesFilter<"ProduceListing"> | string
    cropTypeId?: StringWithAggregatesFilter<"ProduceListing"> | string
    quantity?: StringWithAggregatesFilter<"ProduceListing"> | string
    pricePerUnit?: StringWithAggregatesFilter<"ProduceListing"> | string
    description?: StringNullableWithAggregatesFilter<"ProduceListing"> | string | null
    listingDate?: DateTimeWithAggregatesFilter<"ProduceListing"> | Date | string
    isActive?: BoolWithAggregatesFilter<"ProduceListing"> | boolean
  }

  export type MarketPriceWhereInput = {
    AND?: MarketPriceWhereInput | MarketPriceWhereInput[]
    OR?: MarketPriceWhereInput[]
    NOT?: MarketPriceWhereInput | MarketPriceWhereInput[]
    id?: StringFilter<"MarketPrice"> | string
    cropTypeId?: StringFilter<"MarketPrice"> | string
    marketName?: StringFilter<"MarketPrice"> | string
    price?: StringFilter<"MarketPrice"> | string
    unit?: StringFilter<"MarketPrice"> | string
    date?: DateTimeFilter<"MarketPrice"> | Date | string
    source?: StringNullableFilter<"MarketPrice"> | string | null
    location?: StringNullableFilter<"MarketPrice"> | string | null
    cropType?: XOR<CropTypeScalarRelationFilter, CropTypeWhereInput>
  }

  export type MarketPriceOrderByWithRelationInput = {
    id?: SortOrder
    cropTypeId?: SortOrder
    marketName?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    date?: SortOrder
    source?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    cropType?: CropTypeOrderByWithRelationInput
  }

  export type MarketPriceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MarketPriceWhereInput | MarketPriceWhereInput[]
    OR?: MarketPriceWhereInput[]
    NOT?: MarketPriceWhereInput | MarketPriceWhereInput[]
    cropTypeId?: StringFilter<"MarketPrice"> | string
    marketName?: StringFilter<"MarketPrice"> | string
    price?: StringFilter<"MarketPrice"> | string
    unit?: StringFilter<"MarketPrice"> | string
    date?: DateTimeFilter<"MarketPrice"> | Date | string
    source?: StringNullableFilter<"MarketPrice"> | string | null
    location?: StringNullableFilter<"MarketPrice"> | string | null
    cropType?: XOR<CropTypeScalarRelationFilter, CropTypeWhereInput>
  }, "id">

  export type MarketPriceOrderByWithAggregationInput = {
    id?: SortOrder
    cropTypeId?: SortOrder
    marketName?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    date?: SortOrder
    source?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    _count?: MarketPriceCountOrderByAggregateInput
    _max?: MarketPriceMaxOrderByAggregateInput
    _min?: MarketPriceMinOrderByAggregateInput
  }

  export type MarketPriceScalarWhereWithAggregatesInput = {
    AND?: MarketPriceScalarWhereWithAggregatesInput | MarketPriceScalarWhereWithAggregatesInput[]
    OR?: MarketPriceScalarWhereWithAggregatesInput[]
    NOT?: MarketPriceScalarWhereWithAggregatesInput | MarketPriceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MarketPrice"> | string
    cropTypeId?: StringWithAggregatesFilter<"MarketPrice"> | string
    marketName?: StringWithAggregatesFilter<"MarketPrice"> | string
    price?: StringWithAggregatesFilter<"MarketPrice"> | string
    unit?: StringWithAggregatesFilter<"MarketPrice"> | string
    date?: DateTimeWithAggregatesFilter<"MarketPrice"> | Date | string
    source?: StringNullableWithAggregatesFilter<"MarketPrice"> | string | null
    location?: StringNullableWithAggregatesFilter<"MarketPrice"> | string | null
  }

  export type CropTypeCreateInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
    listings?: ProduceListingCreateNestedManyWithoutCropTypeInput
    marketPrices?: MarketPriceCreateNestedManyWithoutCropTypeInput
  }

  export type CropTypeUncheckedCreateInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
    listings?: ProduceListingUncheckedCreateNestedManyWithoutCropTypeInput
    marketPrices?: MarketPriceUncheckedCreateNestedManyWithoutCropTypeInput
  }

  export type CropTypeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
    listings?: ProduceListingUpdateManyWithoutCropTypeNestedInput
    marketPrices?: MarketPriceUpdateManyWithoutCropTypeNestedInput
  }

  export type CropTypeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
    listings?: ProduceListingUncheckedUpdateManyWithoutCropTypeNestedInput
    marketPrices?: MarketPriceUncheckedUpdateManyWithoutCropTypeNestedInput
  }

  export type CropTypeCreateManyInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
  }

  export type CropTypeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CropTypeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProduceListingCreateInput = {
    id?: string
    sellerUserId: string
    quantity: string
    pricePerUnit: string
    description?: string | null
    listingDate?: Date | string
    isActive?: boolean
    cropType: CropTypeCreateNestedOneWithoutListingsInput
  }

  export type ProduceListingUncheckedCreateInput = {
    id?: string
    sellerUserId: string
    cropTypeId: string
    quantity: string
    pricePerUnit: string
    description?: string | null
    listingDate?: Date | string
    isActive?: boolean
  }

  export type ProduceListingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cropType?: CropTypeUpdateOneRequiredWithoutListingsNestedInput
  }

  export type ProduceListingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    cropTypeId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProduceListingCreateManyInput = {
    id?: string
    sellerUserId: string
    cropTypeId: string
    quantity: string
    pricePerUnit: string
    description?: string | null
    listingDate?: Date | string
    isActive?: boolean
  }

  export type ProduceListingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProduceListingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    cropTypeId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MarketPriceCreateInput = {
    id?: string
    marketName: string
    price: string
    unit: string
    date?: Date | string
    source?: string | null
    location?: string | null
    cropType: CropTypeCreateNestedOneWithoutMarketPricesInput
  }

  export type MarketPriceUncheckedCreateInput = {
    id?: string
    cropTypeId: string
    marketName: string
    price: string
    unit: string
    date?: Date | string
    source?: string | null
    location?: string | null
  }

  export type MarketPriceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    cropType?: CropTypeUpdateOneRequiredWithoutMarketPricesNestedInput
  }

  export type MarketPriceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropTypeId?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketPriceCreateManyInput = {
    id?: string
    cropTypeId: string
    marketName: string
    price: string
    unit: string
    date?: Date | string
    source?: string | null
    location?: string | null
  }

  export type MarketPriceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketPriceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    cropTypeId?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ProduceListingListRelationFilter = {
    every?: ProduceListingWhereInput
    some?: ProduceListingWhereInput
    none?: ProduceListingWhereInput
  }

  export type MarketPriceListRelationFilter = {
    every?: MarketPriceWhereInput
    some?: MarketPriceWhereInput
    none?: MarketPriceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProduceListingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MarketPriceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CropTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_hi?: SortOrder
    name_mr?: SortOrder
    name_ta?: SortOrder
    name_te?: SortOrder
    name_kn?: SortOrder
    name_ml?: SortOrder
    name_pa?: SortOrder
    name_es?: SortOrder
  }

  export type CropTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_hi?: SortOrder
    name_mr?: SortOrder
    name_ta?: SortOrder
    name_te?: SortOrder
    name_kn?: SortOrder
    name_ml?: SortOrder
    name_pa?: SortOrder
    name_es?: SortOrder
  }

  export type CropTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name_en?: SortOrder
    name_hi?: SortOrder
    name_mr?: SortOrder
    name_ta?: SortOrder
    name_te?: SortOrder
    name_kn?: SortOrder
    name_ml?: SortOrder
    name_pa?: SortOrder
    name_es?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CropTypeScalarRelationFilter = {
    is?: CropTypeWhereInput
    isNot?: CropTypeWhereInput
  }

  export type ProduceListingCountOrderByAggregateInput = {
    id?: SortOrder
    sellerUserId?: SortOrder
    cropTypeId?: SortOrder
    quantity?: SortOrder
    pricePerUnit?: SortOrder
    description?: SortOrder
    listingDate?: SortOrder
    isActive?: SortOrder
  }

  export type ProduceListingMaxOrderByAggregateInput = {
    id?: SortOrder
    sellerUserId?: SortOrder
    cropTypeId?: SortOrder
    quantity?: SortOrder
    pricePerUnit?: SortOrder
    description?: SortOrder
    listingDate?: SortOrder
    isActive?: SortOrder
  }

  export type ProduceListingMinOrderByAggregateInput = {
    id?: SortOrder
    sellerUserId?: SortOrder
    cropTypeId?: SortOrder
    quantity?: SortOrder
    pricePerUnit?: SortOrder
    description?: SortOrder
    listingDate?: SortOrder
    isActive?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type MarketPriceCountOrderByAggregateInput = {
    id?: SortOrder
    cropTypeId?: SortOrder
    marketName?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    date?: SortOrder
    source?: SortOrder
    location?: SortOrder
  }

  export type MarketPriceMaxOrderByAggregateInput = {
    id?: SortOrder
    cropTypeId?: SortOrder
    marketName?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    date?: SortOrder
    source?: SortOrder
    location?: SortOrder
  }

  export type MarketPriceMinOrderByAggregateInput = {
    id?: SortOrder
    cropTypeId?: SortOrder
    marketName?: SortOrder
    price?: SortOrder
    unit?: SortOrder
    date?: SortOrder
    source?: SortOrder
    location?: SortOrder
  }

  export type ProduceListingCreateNestedManyWithoutCropTypeInput = {
    create?: XOR<ProduceListingCreateWithoutCropTypeInput, ProduceListingUncheckedCreateWithoutCropTypeInput> | ProduceListingCreateWithoutCropTypeInput[] | ProduceListingUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: ProduceListingCreateOrConnectWithoutCropTypeInput | ProduceListingCreateOrConnectWithoutCropTypeInput[]
    createMany?: ProduceListingCreateManyCropTypeInputEnvelope
    connect?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
  }

  export type MarketPriceCreateNestedManyWithoutCropTypeInput = {
    create?: XOR<MarketPriceCreateWithoutCropTypeInput, MarketPriceUncheckedCreateWithoutCropTypeInput> | MarketPriceCreateWithoutCropTypeInput[] | MarketPriceUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: MarketPriceCreateOrConnectWithoutCropTypeInput | MarketPriceCreateOrConnectWithoutCropTypeInput[]
    createMany?: MarketPriceCreateManyCropTypeInputEnvelope
    connect?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
  }

  export type ProduceListingUncheckedCreateNestedManyWithoutCropTypeInput = {
    create?: XOR<ProduceListingCreateWithoutCropTypeInput, ProduceListingUncheckedCreateWithoutCropTypeInput> | ProduceListingCreateWithoutCropTypeInput[] | ProduceListingUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: ProduceListingCreateOrConnectWithoutCropTypeInput | ProduceListingCreateOrConnectWithoutCropTypeInput[]
    createMany?: ProduceListingCreateManyCropTypeInputEnvelope
    connect?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
  }

  export type MarketPriceUncheckedCreateNestedManyWithoutCropTypeInput = {
    create?: XOR<MarketPriceCreateWithoutCropTypeInput, MarketPriceUncheckedCreateWithoutCropTypeInput> | MarketPriceCreateWithoutCropTypeInput[] | MarketPriceUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: MarketPriceCreateOrConnectWithoutCropTypeInput | MarketPriceCreateOrConnectWithoutCropTypeInput[]
    createMany?: MarketPriceCreateManyCropTypeInputEnvelope
    connect?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ProduceListingUpdateManyWithoutCropTypeNestedInput = {
    create?: XOR<ProduceListingCreateWithoutCropTypeInput, ProduceListingUncheckedCreateWithoutCropTypeInput> | ProduceListingCreateWithoutCropTypeInput[] | ProduceListingUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: ProduceListingCreateOrConnectWithoutCropTypeInput | ProduceListingCreateOrConnectWithoutCropTypeInput[]
    upsert?: ProduceListingUpsertWithWhereUniqueWithoutCropTypeInput | ProduceListingUpsertWithWhereUniqueWithoutCropTypeInput[]
    createMany?: ProduceListingCreateManyCropTypeInputEnvelope
    set?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    disconnect?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    delete?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    connect?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    update?: ProduceListingUpdateWithWhereUniqueWithoutCropTypeInput | ProduceListingUpdateWithWhereUniqueWithoutCropTypeInput[]
    updateMany?: ProduceListingUpdateManyWithWhereWithoutCropTypeInput | ProduceListingUpdateManyWithWhereWithoutCropTypeInput[]
    deleteMany?: ProduceListingScalarWhereInput | ProduceListingScalarWhereInput[]
  }

  export type MarketPriceUpdateManyWithoutCropTypeNestedInput = {
    create?: XOR<MarketPriceCreateWithoutCropTypeInput, MarketPriceUncheckedCreateWithoutCropTypeInput> | MarketPriceCreateWithoutCropTypeInput[] | MarketPriceUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: MarketPriceCreateOrConnectWithoutCropTypeInput | MarketPriceCreateOrConnectWithoutCropTypeInput[]
    upsert?: MarketPriceUpsertWithWhereUniqueWithoutCropTypeInput | MarketPriceUpsertWithWhereUniqueWithoutCropTypeInput[]
    createMany?: MarketPriceCreateManyCropTypeInputEnvelope
    set?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    disconnect?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    delete?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    connect?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    update?: MarketPriceUpdateWithWhereUniqueWithoutCropTypeInput | MarketPriceUpdateWithWhereUniqueWithoutCropTypeInput[]
    updateMany?: MarketPriceUpdateManyWithWhereWithoutCropTypeInput | MarketPriceUpdateManyWithWhereWithoutCropTypeInput[]
    deleteMany?: MarketPriceScalarWhereInput | MarketPriceScalarWhereInput[]
  }

  export type ProduceListingUncheckedUpdateManyWithoutCropTypeNestedInput = {
    create?: XOR<ProduceListingCreateWithoutCropTypeInput, ProduceListingUncheckedCreateWithoutCropTypeInput> | ProduceListingCreateWithoutCropTypeInput[] | ProduceListingUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: ProduceListingCreateOrConnectWithoutCropTypeInput | ProduceListingCreateOrConnectWithoutCropTypeInput[]
    upsert?: ProduceListingUpsertWithWhereUniqueWithoutCropTypeInput | ProduceListingUpsertWithWhereUniqueWithoutCropTypeInput[]
    createMany?: ProduceListingCreateManyCropTypeInputEnvelope
    set?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    disconnect?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    delete?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    connect?: ProduceListingWhereUniqueInput | ProduceListingWhereUniqueInput[]
    update?: ProduceListingUpdateWithWhereUniqueWithoutCropTypeInput | ProduceListingUpdateWithWhereUniqueWithoutCropTypeInput[]
    updateMany?: ProduceListingUpdateManyWithWhereWithoutCropTypeInput | ProduceListingUpdateManyWithWhereWithoutCropTypeInput[]
    deleteMany?: ProduceListingScalarWhereInput | ProduceListingScalarWhereInput[]
  }

  export type MarketPriceUncheckedUpdateManyWithoutCropTypeNestedInput = {
    create?: XOR<MarketPriceCreateWithoutCropTypeInput, MarketPriceUncheckedCreateWithoutCropTypeInput> | MarketPriceCreateWithoutCropTypeInput[] | MarketPriceUncheckedCreateWithoutCropTypeInput[]
    connectOrCreate?: MarketPriceCreateOrConnectWithoutCropTypeInput | MarketPriceCreateOrConnectWithoutCropTypeInput[]
    upsert?: MarketPriceUpsertWithWhereUniqueWithoutCropTypeInput | MarketPriceUpsertWithWhereUniqueWithoutCropTypeInput[]
    createMany?: MarketPriceCreateManyCropTypeInputEnvelope
    set?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    disconnect?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    delete?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    connect?: MarketPriceWhereUniqueInput | MarketPriceWhereUniqueInput[]
    update?: MarketPriceUpdateWithWhereUniqueWithoutCropTypeInput | MarketPriceUpdateWithWhereUniqueWithoutCropTypeInput[]
    updateMany?: MarketPriceUpdateManyWithWhereWithoutCropTypeInput | MarketPriceUpdateManyWithWhereWithoutCropTypeInput[]
    deleteMany?: MarketPriceScalarWhereInput | MarketPriceScalarWhereInput[]
  }

  export type CropTypeCreateNestedOneWithoutListingsInput = {
    create?: XOR<CropTypeCreateWithoutListingsInput, CropTypeUncheckedCreateWithoutListingsInput>
    connectOrCreate?: CropTypeCreateOrConnectWithoutListingsInput
    connect?: CropTypeWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type CropTypeUpdateOneRequiredWithoutListingsNestedInput = {
    create?: XOR<CropTypeCreateWithoutListingsInput, CropTypeUncheckedCreateWithoutListingsInput>
    connectOrCreate?: CropTypeCreateOrConnectWithoutListingsInput
    upsert?: CropTypeUpsertWithoutListingsInput
    connect?: CropTypeWhereUniqueInput
    update?: XOR<XOR<CropTypeUpdateToOneWithWhereWithoutListingsInput, CropTypeUpdateWithoutListingsInput>, CropTypeUncheckedUpdateWithoutListingsInput>
  }

  export type CropTypeCreateNestedOneWithoutMarketPricesInput = {
    create?: XOR<CropTypeCreateWithoutMarketPricesInput, CropTypeUncheckedCreateWithoutMarketPricesInput>
    connectOrCreate?: CropTypeCreateOrConnectWithoutMarketPricesInput
    connect?: CropTypeWhereUniqueInput
  }

  export type CropTypeUpdateOneRequiredWithoutMarketPricesNestedInput = {
    create?: XOR<CropTypeCreateWithoutMarketPricesInput, CropTypeUncheckedCreateWithoutMarketPricesInput>
    connectOrCreate?: CropTypeCreateOrConnectWithoutMarketPricesInput
    upsert?: CropTypeUpsertWithoutMarketPricesInput
    connect?: CropTypeWhereUniqueInput
    update?: XOR<XOR<CropTypeUpdateToOneWithWhereWithoutMarketPricesInput, CropTypeUpdateWithoutMarketPricesInput>, CropTypeUncheckedUpdateWithoutMarketPricesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ProduceListingCreateWithoutCropTypeInput = {
    id?: string
    sellerUserId: string
    quantity: string
    pricePerUnit: string
    description?: string | null
    listingDate?: Date | string
    isActive?: boolean
  }

  export type ProduceListingUncheckedCreateWithoutCropTypeInput = {
    id?: string
    sellerUserId: string
    quantity: string
    pricePerUnit: string
    description?: string | null
    listingDate?: Date | string
    isActive?: boolean
  }

  export type ProduceListingCreateOrConnectWithoutCropTypeInput = {
    where: ProduceListingWhereUniqueInput
    create: XOR<ProduceListingCreateWithoutCropTypeInput, ProduceListingUncheckedCreateWithoutCropTypeInput>
  }

  export type ProduceListingCreateManyCropTypeInputEnvelope = {
    data: ProduceListingCreateManyCropTypeInput | ProduceListingCreateManyCropTypeInput[]
    skipDuplicates?: boolean
  }

  export type MarketPriceCreateWithoutCropTypeInput = {
    id?: string
    marketName: string
    price: string
    unit: string
    date?: Date | string
    source?: string | null
    location?: string | null
  }

  export type MarketPriceUncheckedCreateWithoutCropTypeInput = {
    id?: string
    marketName: string
    price: string
    unit: string
    date?: Date | string
    source?: string | null
    location?: string | null
  }

  export type MarketPriceCreateOrConnectWithoutCropTypeInput = {
    where: MarketPriceWhereUniqueInput
    create: XOR<MarketPriceCreateWithoutCropTypeInput, MarketPriceUncheckedCreateWithoutCropTypeInput>
  }

  export type MarketPriceCreateManyCropTypeInputEnvelope = {
    data: MarketPriceCreateManyCropTypeInput | MarketPriceCreateManyCropTypeInput[]
    skipDuplicates?: boolean
  }

  export type ProduceListingUpsertWithWhereUniqueWithoutCropTypeInput = {
    where: ProduceListingWhereUniqueInput
    update: XOR<ProduceListingUpdateWithoutCropTypeInput, ProduceListingUncheckedUpdateWithoutCropTypeInput>
    create: XOR<ProduceListingCreateWithoutCropTypeInput, ProduceListingUncheckedCreateWithoutCropTypeInput>
  }

  export type ProduceListingUpdateWithWhereUniqueWithoutCropTypeInput = {
    where: ProduceListingWhereUniqueInput
    data: XOR<ProduceListingUpdateWithoutCropTypeInput, ProduceListingUncheckedUpdateWithoutCropTypeInput>
  }

  export type ProduceListingUpdateManyWithWhereWithoutCropTypeInput = {
    where: ProduceListingScalarWhereInput
    data: XOR<ProduceListingUpdateManyMutationInput, ProduceListingUncheckedUpdateManyWithoutCropTypeInput>
  }

  export type ProduceListingScalarWhereInput = {
    AND?: ProduceListingScalarWhereInput | ProduceListingScalarWhereInput[]
    OR?: ProduceListingScalarWhereInput[]
    NOT?: ProduceListingScalarWhereInput | ProduceListingScalarWhereInput[]
    id?: StringFilter<"ProduceListing"> | string
    sellerUserId?: StringFilter<"ProduceListing"> | string
    cropTypeId?: StringFilter<"ProduceListing"> | string
    quantity?: StringFilter<"ProduceListing"> | string
    pricePerUnit?: StringFilter<"ProduceListing"> | string
    description?: StringNullableFilter<"ProduceListing"> | string | null
    listingDate?: DateTimeFilter<"ProduceListing"> | Date | string
    isActive?: BoolFilter<"ProduceListing"> | boolean
  }

  export type MarketPriceUpsertWithWhereUniqueWithoutCropTypeInput = {
    where: MarketPriceWhereUniqueInput
    update: XOR<MarketPriceUpdateWithoutCropTypeInput, MarketPriceUncheckedUpdateWithoutCropTypeInput>
    create: XOR<MarketPriceCreateWithoutCropTypeInput, MarketPriceUncheckedCreateWithoutCropTypeInput>
  }

  export type MarketPriceUpdateWithWhereUniqueWithoutCropTypeInput = {
    where: MarketPriceWhereUniqueInput
    data: XOR<MarketPriceUpdateWithoutCropTypeInput, MarketPriceUncheckedUpdateWithoutCropTypeInput>
  }

  export type MarketPriceUpdateManyWithWhereWithoutCropTypeInput = {
    where: MarketPriceScalarWhereInput
    data: XOR<MarketPriceUpdateManyMutationInput, MarketPriceUncheckedUpdateManyWithoutCropTypeInput>
  }

  export type MarketPriceScalarWhereInput = {
    AND?: MarketPriceScalarWhereInput | MarketPriceScalarWhereInput[]
    OR?: MarketPriceScalarWhereInput[]
    NOT?: MarketPriceScalarWhereInput | MarketPriceScalarWhereInput[]
    id?: StringFilter<"MarketPrice"> | string
    cropTypeId?: StringFilter<"MarketPrice"> | string
    marketName?: StringFilter<"MarketPrice"> | string
    price?: StringFilter<"MarketPrice"> | string
    unit?: StringFilter<"MarketPrice"> | string
    date?: DateTimeFilter<"MarketPrice"> | Date | string
    source?: StringNullableFilter<"MarketPrice"> | string | null
    location?: StringNullableFilter<"MarketPrice"> | string | null
  }

  export type CropTypeCreateWithoutListingsInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
    marketPrices?: MarketPriceCreateNestedManyWithoutCropTypeInput
  }

  export type CropTypeUncheckedCreateWithoutListingsInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
    marketPrices?: MarketPriceUncheckedCreateNestedManyWithoutCropTypeInput
  }

  export type CropTypeCreateOrConnectWithoutListingsInput = {
    where: CropTypeWhereUniqueInput
    create: XOR<CropTypeCreateWithoutListingsInput, CropTypeUncheckedCreateWithoutListingsInput>
  }

  export type CropTypeUpsertWithoutListingsInput = {
    update: XOR<CropTypeUpdateWithoutListingsInput, CropTypeUncheckedUpdateWithoutListingsInput>
    create: XOR<CropTypeCreateWithoutListingsInput, CropTypeUncheckedCreateWithoutListingsInput>
    where?: CropTypeWhereInput
  }

  export type CropTypeUpdateToOneWithWhereWithoutListingsInput = {
    where?: CropTypeWhereInput
    data: XOR<CropTypeUpdateWithoutListingsInput, CropTypeUncheckedUpdateWithoutListingsInput>
  }

  export type CropTypeUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
    marketPrices?: MarketPriceUpdateManyWithoutCropTypeNestedInput
  }

  export type CropTypeUncheckedUpdateWithoutListingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
    marketPrices?: MarketPriceUncheckedUpdateManyWithoutCropTypeNestedInput
  }

  export type CropTypeCreateWithoutMarketPricesInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
    listings?: ProduceListingCreateNestedManyWithoutCropTypeInput
  }

  export type CropTypeUncheckedCreateWithoutMarketPricesInput = {
    id?: string
    name_en: string
    name_hi?: string | null
    name_mr?: string | null
    name_ta?: string | null
    name_te?: string | null
    name_kn?: string | null
    name_ml?: string | null
    name_pa?: string | null
    name_es?: string | null
    listings?: ProduceListingUncheckedCreateNestedManyWithoutCropTypeInput
  }

  export type CropTypeCreateOrConnectWithoutMarketPricesInput = {
    where: CropTypeWhereUniqueInput
    create: XOR<CropTypeCreateWithoutMarketPricesInput, CropTypeUncheckedCreateWithoutMarketPricesInput>
  }

  export type CropTypeUpsertWithoutMarketPricesInput = {
    update: XOR<CropTypeUpdateWithoutMarketPricesInput, CropTypeUncheckedUpdateWithoutMarketPricesInput>
    create: XOR<CropTypeCreateWithoutMarketPricesInput, CropTypeUncheckedCreateWithoutMarketPricesInput>
    where?: CropTypeWhereInput
  }

  export type CropTypeUpdateToOneWithWhereWithoutMarketPricesInput = {
    where?: CropTypeWhereInput
    data: XOR<CropTypeUpdateWithoutMarketPricesInput, CropTypeUncheckedUpdateWithoutMarketPricesInput>
  }

  export type CropTypeUpdateWithoutMarketPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
    listings?: ProduceListingUpdateManyWithoutCropTypeNestedInput
  }

  export type CropTypeUncheckedUpdateWithoutMarketPricesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name_en?: StringFieldUpdateOperationsInput | string
    name_hi?: NullableStringFieldUpdateOperationsInput | string | null
    name_mr?: NullableStringFieldUpdateOperationsInput | string | null
    name_ta?: NullableStringFieldUpdateOperationsInput | string | null
    name_te?: NullableStringFieldUpdateOperationsInput | string | null
    name_kn?: NullableStringFieldUpdateOperationsInput | string | null
    name_ml?: NullableStringFieldUpdateOperationsInput | string | null
    name_pa?: NullableStringFieldUpdateOperationsInput | string | null
    name_es?: NullableStringFieldUpdateOperationsInput | string | null
    listings?: ProduceListingUncheckedUpdateManyWithoutCropTypeNestedInput
  }

  export type ProduceListingCreateManyCropTypeInput = {
    id?: string
    sellerUserId: string
    quantity: string
    pricePerUnit: string
    description?: string | null
    listingDate?: Date | string
    isActive?: boolean
  }

  export type MarketPriceCreateManyCropTypeInput = {
    id?: string
    marketName: string
    price: string
    unit: string
    date?: Date | string
    source?: string | null
    location?: string | null
  }

  export type ProduceListingUpdateWithoutCropTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProduceListingUncheckedUpdateWithoutCropTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ProduceListingUncheckedUpdateManyWithoutCropTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    sellerUserId?: StringFieldUpdateOperationsInput | string
    quantity?: StringFieldUpdateOperationsInput | string
    pricePerUnit?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    listingDate?: DateTimeFieldUpdateOperationsInput | Date | string
    isActive?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MarketPriceUpdateWithoutCropTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketPriceUncheckedUpdateWithoutCropTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MarketPriceUncheckedUpdateManyWithoutCropTypeInput = {
    id?: StringFieldUpdateOperationsInput | string
    marketName?: StringFieldUpdateOperationsInput | string
    price?: StringFieldUpdateOperationsInput | string
    unit?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}