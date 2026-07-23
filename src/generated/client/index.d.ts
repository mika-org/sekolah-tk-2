
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
 * Model Foundation
 * 
 */
export type Foundation = $Result.DefaultSelection<Prisma.$FoundationPayload>
/**
 * Model School
 * 
 */
export type School = $Result.DefaultSelection<Prisma.$SchoolPayload>
/**
 * Model AdminUser
 * 
 */
export type AdminUser = $Result.DefaultSelection<Prisma.$AdminUserPayload>
/**
 * Model SiteProfile
 * 
 */
export type SiteProfile = $Result.DefaultSelection<Prisma.$SiteProfilePayload>
/**
 * Model Program
 * 
 */
export type Program = $Result.DefaultSelection<Prisma.$ProgramPayload>
/**
 * Model GalleryItem
 * 
 */
export type GalleryItem = $Result.DefaultSelection<Prisma.$GalleryItemPayload>
/**
 * Model Testimonial
 * 
 */
export type Testimonial = $Result.DefaultSelection<Prisma.$TestimonialPayload>
/**
 * Model PpdbRegistration
 * 
 */
export type PpdbRegistration = $Result.DefaultSelection<Prisma.$PpdbRegistrationPayload>
/**
 * Model UploadLog
 * 
 */
export type UploadLog = $Result.DefaultSelection<Prisma.$UploadLogPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Foundations
 * const foundations = await prisma.foundation.findMany()
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
   * // Fetch zero or more Foundations
   * const foundations = await prisma.foundation.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.foundation`: Exposes CRUD operations for the **Foundation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Foundations
    * const foundations = await prisma.foundation.findMany()
    * ```
    */
  get foundation(): Prisma.FoundationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.school`: Exposes CRUD operations for the **School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.SchoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminUser`: Exposes CRUD operations for the **AdminUser** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminUsers
    * const adminUsers = await prisma.adminUser.findMany()
    * ```
    */
  get adminUser(): Prisma.AdminUserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteProfile`: Exposes CRUD operations for the **SiteProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteProfiles
    * const siteProfiles = await prisma.siteProfile.findMany()
    * ```
    */
  get siteProfile(): Prisma.SiteProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.program`: Exposes CRUD operations for the **Program** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Programs
    * const programs = await prisma.program.findMany()
    * ```
    */
  get program(): Prisma.ProgramDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.galleryItem`: Exposes CRUD operations for the **GalleryItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GalleryItems
    * const galleryItems = await prisma.galleryItem.findMany()
    * ```
    */
  get galleryItem(): Prisma.GalleryItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testimonial`: Exposes CRUD operations for the **Testimonial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Testimonials
    * const testimonials = await prisma.testimonial.findMany()
    * ```
    */
  get testimonial(): Prisma.TestimonialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ppdbRegistration`: Exposes CRUD operations for the **PpdbRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PpdbRegistrations
    * const ppdbRegistrations = await prisma.ppdbRegistration.findMany()
    * ```
    */
  get ppdbRegistration(): Prisma.PpdbRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadLog`: Exposes CRUD operations for the **UploadLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadLogs
    * const uploadLogs = await prisma.uploadLog.findMany()
    * ```
    */
  get uploadLog(): Prisma.UploadLogDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.4.0
   * Query Engine version: a9055b89e58b4b5bfb59600785423b1db3d0e75d
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    Foundation: 'Foundation',
    School: 'School',
    AdminUser: 'AdminUser',
    SiteProfile: 'SiteProfile',
    Program: 'Program',
    GalleryItem: 'GalleryItem',
    Testimonial: 'Testimonial',
    PpdbRegistration: 'PpdbRegistration',
    UploadLog: 'UploadLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "foundation" | "school" | "adminUser" | "siteProfile" | "program" | "galleryItem" | "testimonial" | "ppdbRegistration" | "uploadLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Foundation: {
        payload: Prisma.$FoundationPayload<ExtArgs>
        fields: Prisma.FoundationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoundationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoundationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>
          }
          findFirst: {
            args: Prisma.FoundationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoundationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>
          }
          findMany: {
            args: Prisma.FoundationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>[]
          }
          create: {
            args: Prisma.FoundationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>
          }
          createMany: {
            args: Prisma.FoundationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoundationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>[]
          }
          delete: {
            args: Prisma.FoundationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>
          }
          update: {
            args: Prisma.FoundationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>
          }
          deleteMany: {
            args: Prisma.FoundationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoundationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoundationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>[]
          }
          upsert: {
            args: Prisma.FoundationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoundationPayload>
          }
          aggregate: {
            args: Prisma.FoundationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoundation>
          }
          groupBy: {
            args: Prisma.FoundationGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoundationGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoundationCountArgs<ExtArgs>
            result: $Utils.Optional<FoundationCountAggregateOutputType> | number
          }
        }
      }
      School: {
        payload: Prisma.$SchoolPayload<ExtArgs>
        fields: Prisma.SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findFirst: {
            args: Prisma.SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findMany: {
            args: Prisma.SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          create: {
            args: Prisma.SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          createMany: {
            args: Prisma.SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          delete: {
            args: Prisma.SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          update: {
            args: Prisma.SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          deleteMany: {
            args: Prisma.SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          upsert: {
            args: Prisma.SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
      AdminUser: {
        payload: Prisma.$AdminUserPayload<ExtArgs>
        fields: Prisma.AdminUserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminUserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminUserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findFirst: {
            args: Prisma.AdminUserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminUserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          findMany: {
            args: Prisma.AdminUserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          create: {
            args: Prisma.AdminUserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          createMany: {
            args: Prisma.AdminUserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminUserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          delete: {
            args: Prisma.AdminUserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          update: {
            args: Prisma.AdminUserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          deleteMany: {
            args: Prisma.AdminUserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>[]
          }
          upsert: {
            args: Prisma.AdminUserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminUserPayload>
          }
          aggregate: {
            args: Prisma.AdminUserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminUser>
          }
          groupBy: {
            args: Prisma.AdminUserGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminUserGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminUserCountArgs<ExtArgs>
            result: $Utils.Optional<AdminUserCountAggregateOutputType> | number
          }
        }
      }
      SiteProfile: {
        payload: Prisma.$SiteProfilePayload<ExtArgs>
        fields: Prisma.SiteProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>
          }
          findFirst: {
            args: Prisma.SiteProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>
          }
          findMany: {
            args: Prisma.SiteProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>[]
          }
          create: {
            args: Prisma.SiteProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>
          }
          createMany: {
            args: Prisma.SiteProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>[]
          }
          delete: {
            args: Prisma.SiteProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>
          }
          update: {
            args: Prisma.SiteProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>
          }
          deleteMany: {
            args: Prisma.SiteProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>[]
          }
          upsert: {
            args: Prisma.SiteProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteProfilePayload>
          }
          aggregate: {
            args: Prisma.SiteProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteProfile>
          }
          groupBy: {
            args: Prisma.SiteProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteProfileCountArgs<ExtArgs>
            result: $Utils.Optional<SiteProfileCountAggregateOutputType> | number
          }
        }
      }
      Program: {
        payload: Prisma.$ProgramPayload<ExtArgs>
        fields: Prisma.ProgramFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProgramFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProgramFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findFirst: {
            args: Prisma.ProgramFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProgramFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          findMany: {
            args: Prisma.ProgramFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          create: {
            args: Prisma.ProgramCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          createMany: {
            args: Prisma.ProgramCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProgramCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          delete: {
            args: Prisma.ProgramDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          update: {
            args: Prisma.ProgramUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          deleteMany: {
            args: Prisma.ProgramDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProgramUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProgramUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>[]
          }
          upsert: {
            args: Prisma.ProgramUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProgramPayload>
          }
          aggregate: {
            args: Prisma.ProgramAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProgram>
          }
          groupBy: {
            args: Prisma.ProgramGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProgramGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProgramCountArgs<ExtArgs>
            result: $Utils.Optional<ProgramCountAggregateOutputType> | number
          }
        }
      }
      GalleryItem: {
        payload: Prisma.$GalleryItemPayload<ExtArgs>
        fields: Prisma.GalleryItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GalleryItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GalleryItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          findFirst: {
            args: Prisma.GalleryItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GalleryItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          findMany: {
            args: Prisma.GalleryItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>[]
          }
          create: {
            args: Prisma.GalleryItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          createMany: {
            args: Prisma.GalleryItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GalleryItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>[]
          }
          delete: {
            args: Prisma.GalleryItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          update: {
            args: Prisma.GalleryItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          deleteMany: {
            args: Prisma.GalleryItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GalleryItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GalleryItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>[]
          }
          upsert: {
            args: Prisma.GalleryItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GalleryItemPayload>
          }
          aggregate: {
            args: Prisma.GalleryItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGalleryItem>
          }
          groupBy: {
            args: Prisma.GalleryItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<GalleryItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.GalleryItemCountArgs<ExtArgs>
            result: $Utils.Optional<GalleryItemCountAggregateOutputType> | number
          }
        }
      }
      Testimonial: {
        payload: Prisma.$TestimonialPayload<ExtArgs>
        fields: Prisma.TestimonialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestimonialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestimonialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findFirst: {
            args: Prisma.TestimonialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestimonialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findMany: {
            args: Prisma.TestimonialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          create: {
            args: Prisma.TestimonialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          createMany: {
            args: Prisma.TestimonialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TestimonialCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          delete: {
            args: Prisma.TestimonialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          update: {
            args: Prisma.TestimonialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          deleteMany: {
            args: Prisma.TestimonialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestimonialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TestimonialUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          upsert: {
            args: Prisma.TestimonialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          aggregate: {
            args: Prisma.TestimonialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestimonial>
          }
          groupBy: {
            args: Prisma.TestimonialGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestimonialGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestimonialCountArgs<ExtArgs>
            result: $Utils.Optional<TestimonialCountAggregateOutputType> | number
          }
        }
      }
      PpdbRegistration: {
        payload: Prisma.$PpdbRegistrationPayload<ExtArgs>
        fields: Prisma.PpdbRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PpdbRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PpdbRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>
          }
          findFirst: {
            args: Prisma.PpdbRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PpdbRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>
          }
          findMany: {
            args: Prisma.PpdbRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>[]
          }
          create: {
            args: Prisma.PpdbRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>
          }
          createMany: {
            args: Prisma.PpdbRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PpdbRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>[]
          }
          delete: {
            args: Prisma.PpdbRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>
          }
          update: {
            args: Prisma.PpdbRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.PpdbRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PpdbRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PpdbRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.PpdbRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PpdbRegistrationPayload>
          }
          aggregate: {
            args: Prisma.PpdbRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePpdbRegistration>
          }
          groupBy: {
            args: Prisma.PpdbRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PpdbRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PpdbRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<PpdbRegistrationCountAggregateOutputType> | number
          }
        }
      }
      UploadLog: {
        payload: Prisma.$UploadLogPayload<ExtArgs>
        fields: Prisma.UploadLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>
          }
          findFirst: {
            args: Prisma.UploadLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>
          }
          findMany: {
            args: Prisma.UploadLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>[]
          }
          create: {
            args: Prisma.UploadLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>
          }
          createMany: {
            args: Prisma.UploadLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UploadLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>[]
          }
          delete: {
            args: Prisma.UploadLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>
          }
          update: {
            args: Prisma.UploadLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>
          }
          deleteMany: {
            args: Prisma.UploadLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UploadLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>[]
          }
          upsert: {
            args: Prisma.UploadLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadLogPayload>
          }
          aggregate: {
            args: Prisma.UploadLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadLog>
          }
          groupBy: {
            args: Prisma.UploadLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadLogCountArgs<ExtArgs>
            result: $Utils.Optional<UploadLogCountAggregateOutputType> | number
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
    foundation?: FoundationOmit
    school?: SchoolOmit
    adminUser?: AdminUserOmit
    siteProfile?: SiteProfileOmit
    program?: ProgramOmit
    galleryItem?: GalleryItemOmit
    testimonial?: TestimonialOmit
    ppdbRegistration?: PpdbRegistrationOmit
    uploadLog?: UploadLogOmit
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
   * Count Type FoundationCountOutputType
   */

  export type FoundationCountOutputType = {
    schools: number
  }

  export type FoundationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schools?: boolean | FoundationCountOutputTypeCountSchoolsArgs
  }

  // Custom InputTypes
  /**
   * FoundationCountOutputType without action
   */
  export type FoundationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoundationCountOutputType
     */
    select?: FoundationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FoundationCountOutputType without action
   */
  export type FoundationCountOutputTypeCountSchoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }


  /**
   * Count Type SchoolCountOutputType
   */

  export type SchoolCountOutputType = {
    adminUsers: number
    programs: number
    galleryItems: number
    testimonials: number
    ppdbRegistrations: number
  }

  export type SchoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    adminUsers?: boolean | SchoolCountOutputTypeCountAdminUsersArgs
    programs?: boolean | SchoolCountOutputTypeCountProgramsArgs
    galleryItems?: boolean | SchoolCountOutputTypeCountGalleryItemsArgs
    testimonials?: boolean | SchoolCountOutputTypeCountTestimonialsArgs
    ppdbRegistrations?: boolean | SchoolCountOutputTypeCountPpdbRegistrationsArgs
  }

  // Custom InputTypes
  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolCountOutputType
     */
    select?: SchoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountAdminUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountProgramsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountGalleryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryItemWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountTestimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountPpdbRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PpdbRegistrationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Foundation
   */

  export type AggregateFoundation = {
    _count: FoundationCountAggregateOutputType | null
    _min: FoundationMinAggregateOutputType | null
    _max: FoundationMaxAggregateOutputType | null
  }

  export type FoundationMinAggregateOutputType = {
    id: string | null
    name: string | null
    tagline: string | null
    logoUrl: string | null
    phone: string | null
    email: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoundationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    tagline: string | null
    logoUrl: string | null
    phone: string | null
    email: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FoundationCountAggregateOutputType = {
    id: number
    name: number
    tagline: number
    logoUrl: number
    phone: number
    email: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FoundationMinAggregateInputType = {
    id?: true
    name?: true
    tagline?: true
    logoUrl?: true
    phone?: true
    email?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoundationMaxAggregateInputType = {
    id?: true
    name?: true
    tagline?: true
    logoUrl?: true
    phone?: true
    email?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FoundationCountAggregateInputType = {
    id?: true
    name?: true
    tagline?: true
    logoUrl?: true
    phone?: true
    email?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FoundationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foundation to aggregate.
     */
    where?: FoundationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foundations to fetch.
     */
    orderBy?: FoundationOrderByWithRelationInput | FoundationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoundationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foundations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foundations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Foundations
    **/
    _count?: true | FoundationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoundationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoundationMaxAggregateInputType
  }

  export type GetFoundationAggregateType<T extends FoundationAggregateArgs> = {
        [P in keyof T & keyof AggregateFoundation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoundation[P]>
      : GetScalarType<T[P], AggregateFoundation[P]>
  }




  export type FoundationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoundationWhereInput
    orderBy?: FoundationOrderByWithAggregationInput | FoundationOrderByWithAggregationInput[]
    by: FoundationScalarFieldEnum[] | FoundationScalarFieldEnum
    having?: FoundationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoundationCountAggregateInputType | true
    _min?: FoundationMinAggregateInputType
    _max?: FoundationMaxAggregateInputType
  }

  export type FoundationGroupByOutputType = {
    id: string
    name: string
    tagline: string
    logoUrl: string | null
    phone: string | null
    email: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: FoundationCountAggregateOutputType | null
    _min: FoundationMinAggregateOutputType | null
    _max: FoundationMaxAggregateOutputType | null
  }

  type GetFoundationGroupByPayload<T extends FoundationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoundationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoundationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoundationGroupByOutputType[P]>
            : GetScalarType<T[P], FoundationGroupByOutputType[P]>
        }
      >
    >


  export type FoundationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tagline?: boolean
    logoUrl?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    schools?: boolean | Foundation$schoolsArgs<ExtArgs>
    _count?: boolean | FoundationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foundation"]>

  export type FoundationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tagline?: boolean
    logoUrl?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foundation"]>

  export type FoundationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tagline?: boolean
    logoUrl?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["foundation"]>

  export type FoundationSelectScalar = {
    id?: boolean
    name?: boolean
    tagline?: boolean
    logoUrl?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FoundationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "tagline" | "logoUrl" | "phone" | "email" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["foundation"]>
  export type FoundationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schools?: boolean | Foundation$schoolsArgs<ExtArgs>
    _count?: boolean | FoundationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FoundationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FoundationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FoundationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Foundation"
    objects: {
      schools: Prisma.$SchoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tagline: string
      logoUrl: string | null
      phone: string | null
      email: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["foundation"]>
    composites: {}
  }

  type FoundationGetPayload<S extends boolean | null | undefined | FoundationDefaultArgs> = $Result.GetResult<Prisma.$FoundationPayload, S>

  type FoundationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoundationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoundationCountAggregateInputType | true
    }

  export interface FoundationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Foundation'], meta: { name: 'Foundation' } }
    /**
     * Find zero or one Foundation that matches the filter.
     * @param {FoundationFindUniqueArgs} args - Arguments to find a Foundation
     * @example
     * // Get one Foundation
     * const foundation = await prisma.foundation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoundationFindUniqueArgs>(args: SelectSubset<T, FoundationFindUniqueArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Foundation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoundationFindUniqueOrThrowArgs} args - Arguments to find a Foundation
     * @example
     * // Get one Foundation
     * const foundation = await prisma.foundation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoundationFindUniqueOrThrowArgs>(args: SelectSubset<T, FoundationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Foundation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationFindFirstArgs} args - Arguments to find a Foundation
     * @example
     * // Get one Foundation
     * const foundation = await prisma.foundation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoundationFindFirstArgs>(args?: SelectSubset<T, FoundationFindFirstArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Foundation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationFindFirstOrThrowArgs} args - Arguments to find a Foundation
     * @example
     * // Get one Foundation
     * const foundation = await prisma.foundation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoundationFindFirstOrThrowArgs>(args?: SelectSubset<T, FoundationFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Foundations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Foundations
     * const foundations = await prisma.foundation.findMany()
     * 
     * // Get first 10 Foundations
     * const foundations = await prisma.foundation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foundationWithIdOnly = await prisma.foundation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoundationFindManyArgs>(args?: SelectSubset<T, FoundationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Foundation.
     * @param {FoundationCreateArgs} args - Arguments to create a Foundation.
     * @example
     * // Create one Foundation
     * const Foundation = await prisma.foundation.create({
     *   data: {
     *     // ... data to create a Foundation
     *   }
     * })
     * 
     */
    create<T extends FoundationCreateArgs>(args: SelectSubset<T, FoundationCreateArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Foundations.
     * @param {FoundationCreateManyArgs} args - Arguments to create many Foundations.
     * @example
     * // Create many Foundations
     * const foundation = await prisma.foundation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoundationCreateManyArgs>(args?: SelectSubset<T, FoundationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Foundations and returns the data saved in the database.
     * @param {FoundationCreateManyAndReturnArgs} args - Arguments to create many Foundations.
     * @example
     * // Create many Foundations
     * const foundation = await prisma.foundation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Foundations and only return the `id`
     * const foundationWithIdOnly = await prisma.foundation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoundationCreateManyAndReturnArgs>(args?: SelectSubset<T, FoundationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Foundation.
     * @param {FoundationDeleteArgs} args - Arguments to delete one Foundation.
     * @example
     * // Delete one Foundation
     * const Foundation = await prisma.foundation.delete({
     *   where: {
     *     // ... filter to delete one Foundation
     *   }
     * })
     * 
     */
    delete<T extends FoundationDeleteArgs>(args: SelectSubset<T, FoundationDeleteArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Foundation.
     * @param {FoundationUpdateArgs} args - Arguments to update one Foundation.
     * @example
     * // Update one Foundation
     * const foundation = await prisma.foundation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoundationUpdateArgs>(args: SelectSubset<T, FoundationUpdateArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Foundations.
     * @param {FoundationDeleteManyArgs} args - Arguments to filter Foundations to delete.
     * @example
     * // Delete a few Foundations
     * const { count } = await prisma.foundation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoundationDeleteManyArgs>(args?: SelectSubset<T, FoundationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foundations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Foundations
     * const foundation = await prisma.foundation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoundationUpdateManyArgs>(args: SelectSubset<T, FoundationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Foundations and returns the data updated in the database.
     * @param {FoundationUpdateManyAndReturnArgs} args - Arguments to update many Foundations.
     * @example
     * // Update many Foundations
     * const foundation = await prisma.foundation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Foundations and only return the `id`
     * const foundationWithIdOnly = await prisma.foundation.updateManyAndReturn({
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
    updateManyAndReturn<T extends FoundationUpdateManyAndReturnArgs>(args: SelectSubset<T, FoundationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Foundation.
     * @param {FoundationUpsertArgs} args - Arguments to update or create a Foundation.
     * @example
     * // Update or create a Foundation
     * const foundation = await prisma.foundation.upsert({
     *   create: {
     *     // ... data to create a Foundation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Foundation we want to update
     *   }
     * })
     */
    upsert<T extends FoundationUpsertArgs>(args: SelectSubset<T, FoundationUpsertArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Foundations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationCountArgs} args - Arguments to filter Foundations to count.
     * @example
     * // Count the number of Foundations
     * const count = await prisma.foundation.count({
     *   where: {
     *     // ... the filter for the Foundations we want to count
     *   }
     * })
    **/
    count<T extends FoundationCountArgs>(
      args?: Subset<T, FoundationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoundationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Foundation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FoundationAggregateArgs>(args: Subset<T, FoundationAggregateArgs>): Prisma.PrismaPromise<GetFoundationAggregateType<T>>

    /**
     * Group by Foundation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoundationGroupByArgs} args - Group by arguments.
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
      T extends FoundationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoundationGroupByArgs['orderBy'] }
        : { orderBy?: FoundationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FoundationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoundationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Foundation model
   */
  readonly fields: FoundationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Foundation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoundationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    schools<T extends Foundation$schoolsArgs<ExtArgs> = {}>(args?: Subset<T, Foundation$schoolsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
   * Fields of the Foundation model
   */ 
  interface FoundationFieldRefs {
    readonly id: FieldRef<"Foundation", 'String'>
    readonly name: FieldRef<"Foundation", 'String'>
    readonly tagline: FieldRef<"Foundation", 'String'>
    readonly logoUrl: FieldRef<"Foundation", 'String'>
    readonly phone: FieldRef<"Foundation", 'String'>
    readonly email: FieldRef<"Foundation", 'String'>
    readonly address: FieldRef<"Foundation", 'String'>
    readonly createdAt: FieldRef<"Foundation", 'DateTime'>
    readonly updatedAt: FieldRef<"Foundation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Foundation findUnique
   */
  export type FoundationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * Filter, which Foundation to fetch.
     */
    where: FoundationWhereUniqueInput
  }

  /**
   * Foundation findUniqueOrThrow
   */
  export type FoundationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * Filter, which Foundation to fetch.
     */
    where: FoundationWhereUniqueInput
  }

  /**
   * Foundation findFirst
   */
  export type FoundationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * Filter, which Foundation to fetch.
     */
    where?: FoundationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foundations to fetch.
     */
    orderBy?: FoundationOrderByWithRelationInput | FoundationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foundations.
     */
    cursor?: FoundationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foundations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foundations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foundations.
     */
    distinct?: FoundationScalarFieldEnum | FoundationScalarFieldEnum[]
  }

  /**
   * Foundation findFirstOrThrow
   */
  export type FoundationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * Filter, which Foundation to fetch.
     */
    where?: FoundationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foundations to fetch.
     */
    orderBy?: FoundationOrderByWithRelationInput | FoundationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Foundations.
     */
    cursor?: FoundationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foundations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foundations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Foundations.
     */
    distinct?: FoundationScalarFieldEnum | FoundationScalarFieldEnum[]
  }

  /**
   * Foundation findMany
   */
  export type FoundationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * Filter, which Foundations to fetch.
     */
    where?: FoundationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Foundations to fetch.
     */
    orderBy?: FoundationOrderByWithRelationInput | FoundationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Foundations.
     */
    cursor?: FoundationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Foundations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Foundations.
     */
    skip?: number
    distinct?: FoundationScalarFieldEnum | FoundationScalarFieldEnum[]
  }

  /**
   * Foundation create
   */
  export type FoundationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * The data needed to create a Foundation.
     */
    data: XOR<FoundationCreateInput, FoundationUncheckedCreateInput>
  }

  /**
   * Foundation createMany
   */
  export type FoundationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Foundations.
     */
    data: FoundationCreateManyInput | FoundationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Foundation createManyAndReturn
   */
  export type FoundationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * The data used to create many Foundations.
     */
    data: FoundationCreateManyInput | FoundationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Foundation update
   */
  export type FoundationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * The data needed to update a Foundation.
     */
    data: XOR<FoundationUpdateInput, FoundationUncheckedUpdateInput>
    /**
     * Choose, which Foundation to update.
     */
    where: FoundationWhereUniqueInput
  }

  /**
   * Foundation updateMany
   */
  export type FoundationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Foundations.
     */
    data: XOR<FoundationUpdateManyMutationInput, FoundationUncheckedUpdateManyInput>
    /**
     * Filter which Foundations to update
     */
    where?: FoundationWhereInput
    /**
     * Limit how many Foundations to update.
     */
    limit?: number
  }

  /**
   * Foundation updateManyAndReturn
   */
  export type FoundationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * The data used to update Foundations.
     */
    data: XOR<FoundationUpdateManyMutationInput, FoundationUncheckedUpdateManyInput>
    /**
     * Filter which Foundations to update
     */
    where?: FoundationWhereInput
    /**
     * Limit how many Foundations to update.
     */
    limit?: number
  }

  /**
   * Foundation upsert
   */
  export type FoundationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * The filter to search for the Foundation to update in case it exists.
     */
    where: FoundationWhereUniqueInput
    /**
     * In case the Foundation found by the `where` argument doesn't exist, create a new Foundation with this data.
     */
    create: XOR<FoundationCreateInput, FoundationUncheckedCreateInput>
    /**
     * In case the Foundation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoundationUpdateInput, FoundationUncheckedUpdateInput>
  }

  /**
   * Foundation delete
   */
  export type FoundationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
    /**
     * Filter which Foundation to delete.
     */
    where: FoundationWhereUniqueInput
  }

  /**
   * Foundation deleteMany
   */
  export type FoundationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Foundations to delete
     */
    where?: FoundationWhereInput
    /**
     * Limit how many Foundations to delete.
     */
    limit?: number
  }

  /**
   * Foundation.schools
   */
  export type Foundation$schoolsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * Foundation without action
   */
  export type FoundationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Foundation
     */
    select?: FoundationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Foundation
     */
    omit?: FoundationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoundationInclude<ExtArgs> | null
  }


  /**
   * Model School
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type SchoolSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type SchoolMinAggregateOutputType = {
    id: string | null
    foundationId: string | null
    code: string | null
    name: string | null
    level: string | null
    address: string | null
    phone: string | null
    logoUrl: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SchoolMaxAggregateOutputType = {
    id: string | null
    foundationId: string | null
    code: string | null
    name: string | null
    level: string | null
    address: string | null
    phone: string | null
    logoUrl: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SchoolCountAggregateOutputType = {
    id: number
    foundationId: number
    code: number
    name: number
    level: number
    address: number
    phone: number
    logoUrl: number
    orderIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SchoolAvgAggregateInputType = {
    orderIndex?: true
  }

  export type SchoolSumAggregateInputType = {
    orderIndex?: true
  }

  export type SchoolMinAggregateInputType = {
    id?: true
    foundationId?: true
    code?: true
    name?: true
    level?: true
    address?: true
    phone?: true
    logoUrl?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SchoolMaxAggregateInputType = {
    id?: true
    foundationId?: true
    code?: true
    name?: true
    level?: true
    address?: true
    phone?: true
    logoUrl?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SchoolCountAggregateInputType = {
    id?: true
    foundationId?: true
    code?: true
    name?: true
    level?: true
    address?: true
    phone?: true
    logoUrl?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which School to aggregate.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithAggregationInput | SchoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _avg?: SchoolAvgAggregateInputType
    _sum?: SchoolSumAggregateInputType
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    id: string
    foundationId: string
    code: string
    name: string
    level: string
    address: string
    phone: string
    logoUrl: string | null
    orderIndex: number
    createdAt: Date
    updatedAt: Date
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    foundationId?: boolean
    code?: boolean
    name?: boolean
    level?: boolean
    address?: boolean
    phone?: boolean
    logoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    foundation?: boolean | FoundationDefaultArgs<ExtArgs>
    adminUsers?: boolean | School$adminUsersArgs<ExtArgs>
    siteProfile?: boolean | School$siteProfileArgs<ExtArgs>
    programs?: boolean | School$programsArgs<ExtArgs>
    galleryItems?: boolean | School$galleryItemsArgs<ExtArgs>
    testimonials?: boolean | School$testimonialsArgs<ExtArgs>
    ppdbRegistrations?: boolean | School$ppdbRegistrationsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    foundationId?: boolean
    code?: boolean
    name?: boolean
    level?: boolean
    address?: boolean
    phone?: boolean
    logoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    foundation?: boolean | FoundationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    foundationId?: boolean
    code?: boolean
    name?: boolean
    level?: boolean
    address?: boolean
    phone?: boolean
    logoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    foundation?: boolean | FoundationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectScalar = {
    id?: boolean
    foundationId?: boolean
    code?: boolean
    name?: boolean
    level?: boolean
    address?: boolean
    phone?: boolean
    logoUrl?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SchoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "foundationId" | "code" | "name" | "level" | "address" | "phone" | "logoUrl" | "orderIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["school"]>
  export type SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundation?: boolean | FoundationDefaultArgs<ExtArgs>
    adminUsers?: boolean | School$adminUsersArgs<ExtArgs>
    siteProfile?: boolean | School$siteProfileArgs<ExtArgs>
    programs?: boolean | School$programsArgs<ExtArgs>
    galleryItems?: boolean | School$galleryItemsArgs<ExtArgs>
    testimonials?: boolean | School$testimonialsArgs<ExtArgs>
    ppdbRegistrations?: boolean | School$ppdbRegistrationsArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundation?: boolean | FoundationDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    foundation?: boolean | FoundationDefaultArgs<ExtArgs>
  }

  export type $SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "School"
    objects: {
      foundation: Prisma.$FoundationPayload<ExtArgs>
      adminUsers: Prisma.$AdminUserPayload<ExtArgs>[]
      siteProfile: Prisma.$SiteProfilePayload<ExtArgs> | null
      programs: Prisma.$ProgramPayload<ExtArgs>[]
      galleryItems: Prisma.$GalleryItemPayload<ExtArgs>[]
      testimonials: Prisma.$TestimonialPayload<ExtArgs>[]
      ppdbRegistrations: Prisma.$PpdbRegistrationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      foundationId: string
      code: string
      name: string
      level: string
      address: string
      phone: string
      logoUrl: string | null
      orderIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type SchoolGetPayload<S extends boolean | null | undefined | SchoolDefaultArgs> = $Result.GetResult<Prisma.$SchoolPayload, S>

  type SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['School'], meta: { name: 'School' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {SchoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolFindUniqueArgs>(args: SelectSubset<T, SchoolFindUniqueArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolFindFirstArgs>(args?: SelectSubset<T, SchoolFindFirstArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolWithIdOnly = await prisma.school.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolFindManyArgs>(args?: SelectSubset<T, SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a School.
     * @param {SchoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends SchoolCreateArgs>(args: SelectSubset<T, SchoolCreateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Schools.
     * @param {SchoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolCreateManyArgs>(args?: SelectSubset<T, SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {SchoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `id`
     * const schoolWithIdOnly = await prisma.school.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a School.
     * @param {SchoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends SchoolDeleteArgs>(args: SelectSubset<T, SchoolDeleteArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one School.
     * @param {SchoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolUpdateArgs>(args: SelectSubset<T, SchoolUpdateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Schools.
     * @param {SchoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolDeleteManyArgs>(args?: SelectSubset<T, SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolUpdateManyArgs>(args: SelectSubset<T, SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools and returns the data updated in the database.
     * @param {SchoolUpdateManyAndReturnArgs} args - Arguments to update many Schools.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schools and only return the `id`
     * const schoolWithIdOnly = await prisma.school.updateManyAndReturn({
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
    updateManyAndReturn<T extends SchoolUpdateManyAndReturnArgs>(args: SelectSubset<T, SchoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one School.
     * @param {SchoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends SchoolUpsertArgs>(args: SelectSubset<T, SchoolUpsertArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends SchoolCountArgs>(
      args?: Subset<T, SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolGroupByArgs} args - Group by arguments.
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
      T extends SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolGroupByArgs['orderBy'] }
        : { orderBy?: SchoolGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the School model
   */
  readonly fields: SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    foundation<T extends FoundationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FoundationDefaultArgs<ExtArgs>>): Prisma__FoundationClient<$Result.GetResult<Prisma.$FoundationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    adminUsers<T extends School$adminUsersArgs<ExtArgs> = {}>(args?: Subset<T, School$adminUsersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    siteProfile<T extends School$siteProfileArgs<ExtArgs> = {}>(args?: Subset<T, School$siteProfileArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    programs<T extends School$programsArgs<ExtArgs> = {}>(args?: Subset<T, School$programsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    galleryItems<T extends School$galleryItemsArgs<ExtArgs> = {}>(args?: Subset<T, School$galleryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    testimonials<T extends School$testimonialsArgs<ExtArgs> = {}>(args?: Subset<T, School$testimonialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    ppdbRegistrations<T extends School$ppdbRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, School$ppdbRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
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
   * Fields of the School model
   */ 
  interface SchoolFieldRefs {
    readonly id: FieldRef<"School", 'String'>
    readonly foundationId: FieldRef<"School", 'String'>
    readonly code: FieldRef<"School", 'String'>
    readonly name: FieldRef<"School", 'String'>
    readonly level: FieldRef<"School", 'String'>
    readonly address: FieldRef<"School", 'String'>
    readonly phone: FieldRef<"School", 'String'>
    readonly logoUrl: FieldRef<"School", 'String'>
    readonly orderIndex: FieldRef<"School", 'Int'>
    readonly createdAt: FieldRef<"School", 'DateTime'>
    readonly updatedAt: FieldRef<"School", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * School findUnique
   */
  export type SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findUniqueOrThrow
   */
  export type SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findFirst
   */
  export type SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findFirstOrThrow
   */
  export type SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findMany
   */
  export type SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Schools to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School create
   */
  export type SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a School.
     */
    data: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
  }

  /**
   * School createMany
   */
  export type SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School createManyAndReturn
   */
  export type SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * School update
   */
  export type SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a School.
     */
    data: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
    /**
     * Choose, which School to update.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School updateMany
   */
  export type SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to update.
     */
    limit?: number
  }

  /**
   * School updateManyAndReturn
   */
  export type SchoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * School upsert
   */
  export type SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the School to update in case it exists.
     */
    where: SchoolWhereUniqueInput
    /**
     * In case the School found by the `where` argument doesn't exist, create a new School with this data.
     */
    create: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
    /**
     * In case the School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
  }

  /**
   * School delete
   */
  export type SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter which School to delete.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School deleteMany
   */
  export type SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schools to delete
     */
    where?: SchoolWhereInput
    /**
     * Limit how many Schools to delete.
     */
    limit?: number
  }

  /**
   * School.adminUsers
   */
  export type School$adminUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    cursor?: AdminUserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * School.siteProfile
   */
  export type School$siteProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    where?: SiteProfileWhereInput
  }

  /**
   * School.programs
   */
  export type School$programsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    cursor?: ProgramWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * School.galleryItems
   */
  export type School$galleryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    where?: GalleryItemWhereInput
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    cursor?: GalleryItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * School.testimonials
   */
  export type School$testimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    cursor?: TestimonialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * School.ppdbRegistrations
   */
  export type School$ppdbRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    where?: PpdbRegistrationWhereInput
    orderBy?: PpdbRegistrationOrderByWithRelationInput | PpdbRegistrationOrderByWithRelationInput[]
    cursor?: PpdbRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PpdbRegistrationScalarFieldEnum | PpdbRegistrationScalarFieldEnum[]
  }

  /**
   * School without action
   */
  export type SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
  }


  /**
   * Model AdminUser
   */

  export type AggregateAdminUser = {
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  export type AdminUserMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminUserCountAggregateOutputType = {
    id: number
    schoolId: number
    username: number
    passwordHash: number
    name: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminUserMinAggregateInputType = {
    id?: true
    schoolId?: true
    username?: true
    passwordHash?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserMaxAggregateInputType = {
    id?: true
    schoolId?: true
    username?: true
    passwordHash?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminUserCountAggregateInputType = {
    id?: true
    schoolId?: true
    username?: true
    passwordHash?: true
    name?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminUserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUser to aggregate.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminUsers
    **/
    _count?: true | AdminUserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminUserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminUserMaxAggregateInputType
  }

  export type GetAdminUserAggregateType<T extends AdminUserAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminUser[P]>
      : GetScalarType<T[P], AggregateAdminUser[P]>
  }




  export type AdminUserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminUserWhereInput
    orderBy?: AdminUserOrderByWithAggregationInput | AdminUserOrderByWithAggregationInput[]
    by: AdminUserScalarFieldEnum[] | AdminUserScalarFieldEnum
    having?: AdminUserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminUserCountAggregateInputType | true
    _min?: AdminUserMinAggregateInputType
    _max?: AdminUserMaxAggregateInputType
  }

  export type AdminUserGroupByOutputType = {
    id: string
    schoolId: string | null
    username: string
    passwordHash: string
    name: string
    role: string
    createdAt: Date
    updatedAt: Date
    _count: AdminUserCountAggregateOutputType | null
    _min: AdminUserMinAggregateOutputType | null
    _max: AdminUserMaxAggregateOutputType | null
  }

  type GetAdminUserGroupByPayload<T extends AdminUserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminUserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminUserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
            : GetScalarType<T[P], AdminUserGroupByOutputType[P]>
        }
      >
    >


  export type AdminUserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | AdminUser$schoolArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | AdminUser$schoolArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | AdminUser$schoolArgs<ExtArgs>
  }, ExtArgs["result"]["adminUser"]>

  export type AdminUserSelectScalar = {
    id?: boolean
    schoolId?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminUserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolId" | "username" | "passwordHash" | "name" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["adminUser"]>
  export type AdminUserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | AdminUser$schoolArgs<ExtArgs>
  }
  export type AdminUserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | AdminUser$schoolArgs<ExtArgs>
  }
  export type AdminUserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | AdminUser$schoolArgs<ExtArgs>
  }

  export type $AdminUserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminUser"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string | null
      username: string
      passwordHash: string
      name: string
      role: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminUser"]>
    composites: {}
  }

  type AdminUserGetPayload<S extends boolean | null | undefined | AdminUserDefaultArgs> = $Result.GetResult<Prisma.$AdminUserPayload, S>

  type AdminUserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminUserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminUserCountAggregateInputType | true
    }

  export interface AdminUserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminUser'], meta: { name: 'AdminUser' } }
    /**
     * Find zero or one AdminUser that matches the filter.
     * @param {AdminUserFindUniqueArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminUserFindUniqueArgs>(args: SelectSubset<T, AdminUserFindUniqueArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one AdminUser that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminUserFindUniqueOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminUserFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminUserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first AdminUser that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminUserFindFirstArgs>(args?: SelectSubset<T, AdminUserFindFirstArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first AdminUser that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindFirstOrThrowArgs} args - Arguments to find a AdminUser
     * @example
     * // Get one AdminUser
     * const adminUser = await prisma.adminUser.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminUserFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminUserFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more AdminUsers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminUsers
     * const adminUsers = await prisma.adminUser.findMany()
     * 
     * // Get first 10 AdminUsers
     * const adminUsers = await prisma.adminUser.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminUserFindManyArgs>(args?: SelectSubset<T, AdminUserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a AdminUser.
     * @param {AdminUserCreateArgs} args - Arguments to create a AdminUser.
     * @example
     * // Create one AdminUser
     * const AdminUser = await prisma.adminUser.create({
     *   data: {
     *     // ... data to create a AdminUser
     *   }
     * })
     * 
     */
    create<T extends AdminUserCreateArgs>(args: SelectSubset<T, AdminUserCreateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many AdminUsers.
     * @param {AdminUserCreateManyArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminUserCreateManyArgs>(args?: SelectSubset<T, AdminUserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminUsers and returns the data saved in the database.
     * @param {AdminUserCreateManyAndReturnArgs} args - Arguments to create many AdminUsers.
     * @example
     * // Create many AdminUsers
     * const adminUser = await prisma.adminUser.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminUserCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminUserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a AdminUser.
     * @param {AdminUserDeleteArgs} args - Arguments to delete one AdminUser.
     * @example
     * // Delete one AdminUser
     * const AdminUser = await prisma.adminUser.delete({
     *   where: {
     *     // ... filter to delete one AdminUser
     *   }
     * })
     * 
     */
    delete<T extends AdminUserDeleteArgs>(args: SelectSubset<T, AdminUserDeleteArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one AdminUser.
     * @param {AdminUserUpdateArgs} args - Arguments to update one AdminUser.
     * @example
     * // Update one AdminUser
     * const adminUser = await prisma.adminUser.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUserUpdateArgs>(args: SelectSubset<T, AdminUserUpdateArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more AdminUsers.
     * @param {AdminUserDeleteManyArgs} args - Arguments to filter AdminUsers to delete.
     * @example
     * // Delete a few AdminUsers
     * const { count } = await prisma.adminUser.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminUserDeleteManyArgs>(args?: SelectSubset<T, AdminUserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUserUpdateManyArgs>(args: SelectSubset<T, AdminUserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminUsers and returns the data updated in the database.
     * @param {AdminUserUpdateManyAndReturnArgs} args - Arguments to update many AdminUsers.
     * @example
     * // Update many AdminUsers
     * const adminUser = await prisma.adminUser.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminUsers and only return the `id`
     * const adminUserWithIdOnly = await prisma.adminUser.updateManyAndReturn({
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
    updateManyAndReturn<T extends AdminUserUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one AdminUser.
     * @param {AdminUserUpsertArgs} args - Arguments to update or create a AdminUser.
     * @example
     * // Update or create a AdminUser
     * const adminUser = await prisma.adminUser.upsert({
     *   create: {
     *     // ... data to create a AdminUser
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminUser we want to update
     *   }
     * })
     */
    upsert<T extends AdminUserUpsertArgs>(args: SelectSubset<T, AdminUserUpsertArgs<ExtArgs>>): Prisma__AdminUserClient<$Result.GetResult<Prisma.$AdminUserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of AdminUsers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserCountArgs} args - Arguments to filter AdminUsers to count.
     * @example
     * // Count the number of AdminUsers
     * const count = await prisma.adminUser.count({
     *   where: {
     *     // ... the filter for the AdminUsers we want to count
     *   }
     * })
    **/
    count<T extends AdminUserCountArgs>(
      args?: Subset<T, AdminUserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminUserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AdminUserAggregateArgs>(args: Subset<T, AdminUserAggregateArgs>): Prisma.PrismaPromise<GetAdminUserAggregateType<T>>

    /**
     * Group by AdminUser.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUserGroupByArgs} args - Group by arguments.
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
      T extends AdminUserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminUserGroupByArgs['orderBy'] }
        : { orderBy?: AdminUserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AdminUserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminUser model
   */
  readonly fields: AdminUserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminUser.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminUserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends AdminUser$schoolArgs<ExtArgs> = {}>(args?: Subset<T, AdminUser$schoolArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
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
   * Fields of the AdminUser model
   */ 
  interface AdminUserFieldRefs {
    readonly id: FieldRef<"AdminUser", 'String'>
    readonly schoolId: FieldRef<"AdminUser", 'String'>
    readonly username: FieldRef<"AdminUser", 'String'>
    readonly passwordHash: FieldRef<"AdminUser", 'String'>
    readonly name: FieldRef<"AdminUser", 'String'>
    readonly role: FieldRef<"AdminUser", 'String'>
    readonly createdAt: FieldRef<"AdminUser", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminUser", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminUser findUnique
   */
  export type AdminUserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findUniqueOrThrow
   */
  export type AdminUserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser findFirst
   */
  export type AdminUserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findFirstOrThrow
   */
  export type AdminUserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUser to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminUsers.
     */
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser findMany
   */
  export type AdminUserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter, which AdminUsers to fetch.
     */
    where?: AdminUserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminUsers to fetch.
     */
    orderBy?: AdminUserOrderByWithRelationInput | AdminUserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminUsers.
     */
    cursor?: AdminUserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminUsers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminUsers.
     */
    skip?: number
    distinct?: AdminUserScalarFieldEnum | AdminUserScalarFieldEnum[]
  }

  /**
   * AdminUser create
   */
  export type AdminUserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to create a AdminUser.
     */
    data: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
  }

  /**
   * AdminUser createMany
   */
  export type AdminUserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdminUser createManyAndReturn
   */
  export type AdminUserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to create many AdminUsers.
     */
    data: AdminUserCreateManyInput | AdminUserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminUser update
   */
  export type AdminUserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The data needed to update a AdminUser.
     */
    data: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
    /**
     * Choose, which AdminUser to update.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser updateMany
   */
  export type AdminUserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
  }

  /**
   * AdminUser updateManyAndReturn
   */
  export type AdminUserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * The data used to update AdminUsers.
     */
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyInput>
    /**
     * Filter which AdminUsers to update
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AdminUser upsert
   */
  export type AdminUserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * The filter to search for the AdminUser to update in case it exists.
     */
    where: AdminUserWhereUniqueInput
    /**
     * In case the AdminUser found by the `where` argument doesn't exist, create a new AdminUser with this data.
     */
    create: XOR<AdminUserCreateInput, AdminUserUncheckedCreateInput>
    /**
     * In case the AdminUser was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUserUpdateInput, AdminUserUncheckedUpdateInput>
  }

  /**
   * AdminUser delete
   */
  export type AdminUserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
    /**
     * Filter which AdminUser to delete.
     */
    where: AdminUserWhereUniqueInput
  }

  /**
   * AdminUser deleteMany
   */
  export type AdminUserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminUsers to delete
     */
    where?: AdminUserWhereInput
    /**
     * Limit how many AdminUsers to delete.
     */
    limit?: number
  }

  /**
   * AdminUser.school
   */
  export type AdminUser$schoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
  }

  /**
   * AdminUser without action
   */
  export type AdminUserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminUser
     */
    select?: AdminUserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminUser
     */
    omit?: AdminUserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdminUserInclude<ExtArgs> | null
  }


  /**
   * Model SiteProfile
   */

  export type AggregateSiteProfile = {
    _count: SiteProfileCountAggregateOutputType | null
    _min: SiteProfileMinAggregateOutputType | null
    _max: SiteProfileMaxAggregateOutputType | null
  }

  export type SiteProfileMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    heroBadge: string | null
    heroTitle: string | null
    heroSubtitle: string | null
    heroMascotUrl: string | null
    ctaTitle: string | null
    ctaSubtitle: string | null
    phone: string | null
    instagram: string | null
    facebook: string | null
    address: string | null
    updatedAt: Date | null
  }

  export type SiteProfileMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    heroBadge: string | null
    heroTitle: string | null
    heroSubtitle: string | null
    heroMascotUrl: string | null
    ctaTitle: string | null
    ctaSubtitle: string | null
    phone: string | null
    instagram: string | null
    facebook: string | null
    address: string | null
    updatedAt: Date | null
  }

  export type SiteProfileCountAggregateOutputType = {
    id: number
    schoolId: number
    heroBadge: number
    heroTitle: number
    heroSubtitle: number
    heroMascotUrl: number
    ctaTitle: number
    ctaSubtitle: number
    phone: number
    instagram: number
    facebook: number
    address: number
    updatedAt: number
    _all: number
  }


  export type SiteProfileMinAggregateInputType = {
    id?: true
    schoolId?: true
    heroBadge?: true
    heroTitle?: true
    heroSubtitle?: true
    heroMascotUrl?: true
    ctaTitle?: true
    ctaSubtitle?: true
    phone?: true
    instagram?: true
    facebook?: true
    address?: true
    updatedAt?: true
  }

  export type SiteProfileMaxAggregateInputType = {
    id?: true
    schoolId?: true
    heroBadge?: true
    heroTitle?: true
    heroSubtitle?: true
    heroMascotUrl?: true
    ctaTitle?: true
    ctaSubtitle?: true
    phone?: true
    instagram?: true
    facebook?: true
    address?: true
    updatedAt?: true
  }

  export type SiteProfileCountAggregateInputType = {
    id?: true
    schoolId?: true
    heroBadge?: true
    heroTitle?: true
    heroSubtitle?: true
    heroMascotUrl?: true
    ctaTitle?: true
    ctaSubtitle?: true
    phone?: true
    instagram?: true
    facebook?: true
    address?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteProfile to aggregate.
     */
    where?: SiteProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteProfiles to fetch.
     */
    orderBy?: SiteProfileOrderByWithRelationInput | SiteProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteProfiles
    **/
    _count?: true | SiteProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteProfileMaxAggregateInputType
  }

  export type GetSiteProfileAggregateType<T extends SiteProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteProfile[P]>
      : GetScalarType<T[P], AggregateSiteProfile[P]>
  }




  export type SiteProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteProfileWhereInput
    orderBy?: SiteProfileOrderByWithAggregationInput | SiteProfileOrderByWithAggregationInput[]
    by: SiteProfileScalarFieldEnum[] | SiteProfileScalarFieldEnum
    having?: SiteProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteProfileCountAggregateInputType | true
    _min?: SiteProfileMinAggregateInputType
    _max?: SiteProfileMaxAggregateInputType
  }

  export type SiteProfileGroupByOutputType = {
    id: string
    schoolId: string
    heroBadge: string
    heroTitle: string
    heroSubtitle: string
    heroMascotUrl: string
    ctaTitle: string
    ctaSubtitle: string
    phone: string
    instagram: string
    facebook: string
    address: string | null
    updatedAt: Date
    _count: SiteProfileCountAggregateOutputType | null
    _min: SiteProfileMinAggregateOutputType | null
    _max: SiteProfileMaxAggregateOutputType | null
  }

  type GetSiteProfileGroupByPayload<T extends SiteProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteProfileGroupByOutputType[P]>
            : GetScalarType<T[P], SiteProfileGroupByOutputType[P]>
        }
      >
    >


  export type SiteProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    heroMascotUrl?: boolean
    ctaTitle?: boolean
    ctaSubtitle?: boolean
    phone?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siteProfile"]>

  export type SiteProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    heroMascotUrl?: boolean
    ctaTitle?: boolean
    ctaSubtitle?: boolean
    phone?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siteProfile"]>

  export type SiteProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    heroMascotUrl?: boolean
    ctaTitle?: boolean
    ctaSubtitle?: boolean
    phone?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siteProfile"]>

  export type SiteProfileSelectScalar = {
    id?: boolean
    schoolId?: boolean
    heroBadge?: boolean
    heroTitle?: boolean
    heroSubtitle?: boolean
    heroMascotUrl?: boolean
    ctaTitle?: boolean
    ctaSubtitle?: boolean
    phone?: boolean
    instagram?: boolean
    facebook?: boolean
    address?: boolean
    updatedAt?: boolean
  }

  export type SiteProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolId" | "heroBadge" | "heroTitle" | "heroSubtitle" | "heroMascotUrl" | "ctaTitle" | "ctaSubtitle" | "phone" | "instagram" | "facebook" | "address" | "updatedAt", ExtArgs["result"]["siteProfile"]>
  export type SiteProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type SiteProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type SiteProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $SiteProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteProfile"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      heroBadge: string
      heroTitle: string
      heroSubtitle: string
      heroMascotUrl: string
      ctaTitle: string
      ctaSubtitle: string
      phone: string
      instagram: string
      facebook: string
      address: string | null
      updatedAt: Date
    }, ExtArgs["result"]["siteProfile"]>
    composites: {}
  }

  type SiteProfileGetPayload<S extends boolean | null | undefined | SiteProfileDefaultArgs> = $Result.GetResult<Prisma.$SiteProfilePayload, S>

  type SiteProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteProfileCountAggregateInputType | true
    }

  export interface SiteProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteProfile'], meta: { name: 'SiteProfile' } }
    /**
     * Find zero or one SiteProfile that matches the filter.
     * @param {SiteProfileFindUniqueArgs} args - Arguments to find a SiteProfile
     * @example
     * // Get one SiteProfile
     * const siteProfile = await prisma.siteProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteProfileFindUniqueArgs>(args: SelectSubset<T, SiteProfileFindUniqueArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one SiteProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteProfileFindUniqueOrThrowArgs} args - Arguments to find a SiteProfile
     * @example
     * // Get one SiteProfile
     * const siteProfile = await prisma.siteProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first SiteProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileFindFirstArgs} args - Arguments to find a SiteProfile
     * @example
     * // Get one SiteProfile
     * const siteProfile = await prisma.siteProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteProfileFindFirstArgs>(args?: SelectSubset<T, SiteProfileFindFirstArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first SiteProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileFindFirstOrThrowArgs} args - Arguments to find a SiteProfile
     * @example
     * // Get one SiteProfile
     * const siteProfile = await prisma.siteProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more SiteProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteProfiles
     * const siteProfiles = await prisma.siteProfile.findMany()
     * 
     * // Get first 10 SiteProfiles
     * const siteProfiles = await prisma.siteProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteProfileWithIdOnly = await prisma.siteProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteProfileFindManyArgs>(args?: SelectSubset<T, SiteProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a SiteProfile.
     * @param {SiteProfileCreateArgs} args - Arguments to create a SiteProfile.
     * @example
     * // Create one SiteProfile
     * const SiteProfile = await prisma.siteProfile.create({
     *   data: {
     *     // ... data to create a SiteProfile
     *   }
     * })
     * 
     */
    create<T extends SiteProfileCreateArgs>(args: SelectSubset<T, SiteProfileCreateArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many SiteProfiles.
     * @param {SiteProfileCreateManyArgs} args - Arguments to create many SiteProfiles.
     * @example
     * // Create many SiteProfiles
     * const siteProfile = await prisma.siteProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteProfileCreateManyArgs>(args?: SelectSubset<T, SiteProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteProfiles and returns the data saved in the database.
     * @param {SiteProfileCreateManyAndReturnArgs} args - Arguments to create many SiteProfiles.
     * @example
     * // Create many SiteProfiles
     * const siteProfile = await prisma.siteProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteProfiles and only return the `id`
     * const siteProfileWithIdOnly = await prisma.siteProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a SiteProfile.
     * @param {SiteProfileDeleteArgs} args - Arguments to delete one SiteProfile.
     * @example
     * // Delete one SiteProfile
     * const SiteProfile = await prisma.siteProfile.delete({
     *   where: {
     *     // ... filter to delete one SiteProfile
     *   }
     * })
     * 
     */
    delete<T extends SiteProfileDeleteArgs>(args: SelectSubset<T, SiteProfileDeleteArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one SiteProfile.
     * @param {SiteProfileUpdateArgs} args - Arguments to update one SiteProfile.
     * @example
     * // Update one SiteProfile
     * const siteProfile = await prisma.siteProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteProfileUpdateArgs>(args: SelectSubset<T, SiteProfileUpdateArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more SiteProfiles.
     * @param {SiteProfileDeleteManyArgs} args - Arguments to filter SiteProfiles to delete.
     * @example
     * // Delete a few SiteProfiles
     * const { count } = await prisma.siteProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteProfileDeleteManyArgs>(args?: SelectSubset<T, SiteProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteProfiles
     * const siteProfile = await prisma.siteProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteProfileUpdateManyArgs>(args: SelectSubset<T, SiteProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteProfiles and returns the data updated in the database.
     * @param {SiteProfileUpdateManyAndReturnArgs} args - Arguments to update many SiteProfiles.
     * @example
     * // Update many SiteProfiles
     * const siteProfile = await prisma.siteProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteProfiles and only return the `id`
     * const siteProfileWithIdOnly = await prisma.siteProfile.updateManyAndReturn({
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
    updateManyAndReturn<T extends SiteProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one SiteProfile.
     * @param {SiteProfileUpsertArgs} args - Arguments to update or create a SiteProfile.
     * @example
     * // Update or create a SiteProfile
     * const siteProfile = await prisma.siteProfile.upsert({
     *   create: {
     *     // ... data to create a SiteProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteProfile we want to update
     *   }
     * })
     */
    upsert<T extends SiteProfileUpsertArgs>(args: SelectSubset<T, SiteProfileUpsertArgs<ExtArgs>>): Prisma__SiteProfileClient<$Result.GetResult<Prisma.$SiteProfilePayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of SiteProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileCountArgs} args - Arguments to filter SiteProfiles to count.
     * @example
     * // Count the number of SiteProfiles
     * const count = await prisma.siteProfile.count({
     *   where: {
     *     // ... the filter for the SiteProfiles we want to count
     *   }
     * })
    **/
    count<T extends SiteProfileCountArgs>(
      args?: Subset<T, SiteProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SiteProfileAggregateArgs>(args: Subset<T, SiteProfileAggregateArgs>): Prisma.PrismaPromise<GetSiteProfileAggregateType<T>>

    /**
     * Group by SiteProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteProfileGroupByArgs} args - Group by arguments.
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
      T extends SiteProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteProfileGroupByArgs['orderBy'] }
        : { orderBy?: SiteProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SiteProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteProfile model
   */
  readonly fields: SiteProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the SiteProfile model
   */ 
  interface SiteProfileFieldRefs {
    readonly id: FieldRef<"SiteProfile", 'String'>
    readonly schoolId: FieldRef<"SiteProfile", 'String'>
    readonly heroBadge: FieldRef<"SiteProfile", 'String'>
    readonly heroTitle: FieldRef<"SiteProfile", 'String'>
    readonly heroSubtitle: FieldRef<"SiteProfile", 'String'>
    readonly heroMascotUrl: FieldRef<"SiteProfile", 'String'>
    readonly ctaTitle: FieldRef<"SiteProfile", 'String'>
    readonly ctaSubtitle: FieldRef<"SiteProfile", 'String'>
    readonly phone: FieldRef<"SiteProfile", 'String'>
    readonly instagram: FieldRef<"SiteProfile", 'String'>
    readonly facebook: FieldRef<"SiteProfile", 'String'>
    readonly address: FieldRef<"SiteProfile", 'String'>
    readonly updatedAt: FieldRef<"SiteProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteProfile findUnique
   */
  export type SiteProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * Filter, which SiteProfile to fetch.
     */
    where: SiteProfileWhereUniqueInput
  }

  /**
   * SiteProfile findUniqueOrThrow
   */
  export type SiteProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * Filter, which SiteProfile to fetch.
     */
    where: SiteProfileWhereUniqueInput
  }

  /**
   * SiteProfile findFirst
   */
  export type SiteProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * Filter, which SiteProfile to fetch.
     */
    where?: SiteProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteProfiles to fetch.
     */
    orderBy?: SiteProfileOrderByWithRelationInput | SiteProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteProfiles.
     */
    cursor?: SiteProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteProfiles.
     */
    distinct?: SiteProfileScalarFieldEnum | SiteProfileScalarFieldEnum[]
  }

  /**
   * SiteProfile findFirstOrThrow
   */
  export type SiteProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * Filter, which SiteProfile to fetch.
     */
    where?: SiteProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteProfiles to fetch.
     */
    orderBy?: SiteProfileOrderByWithRelationInput | SiteProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteProfiles.
     */
    cursor?: SiteProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteProfiles.
     */
    distinct?: SiteProfileScalarFieldEnum | SiteProfileScalarFieldEnum[]
  }

  /**
   * SiteProfile findMany
   */
  export type SiteProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * Filter, which SiteProfiles to fetch.
     */
    where?: SiteProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteProfiles to fetch.
     */
    orderBy?: SiteProfileOrderByWithRelationInput | SiteProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteProfiles.
     */
    cursor?: SiteProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteProfiles.
     */
    skip?: number
    distinct?: SiteProfileScalarFieldEnum | SiteProfileScalarFieldEnum[]
  }

  /**
   * SiteProfile create
   */
  export type SiteProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a SiteProfile.
     */
    data: XOR<SiteProfileCreateInput, SiteProfileUncheckedCreateInput>
  }

  /**
   * SiteProfile createMany
   */
  export type SiteProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteProfiles.
     */
    data: SiteProfileCreateManyInput | SiteProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SiteProfile createManyAndReturn
   */
  export type SiteProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * The data used to create many SiteProfiles.
     */
    data: SiteProfileCreateManyInput | SiteProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SiteProfile update
   */
  export type SiteProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a SiteProfile.
     */
    data: XOR<SiteProfileUpdateInput, SiteProfileUncheckedUpdateInput>
    /**
     * Choose, which SiteProfile to update.
     */
    where: SiteProfileWhereUniqueInput
  }

  /**
   * SiteProfile updateMany
   */
  export type SiteProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteProfiles.
     */
    data: XOR<SiteProfileUpdateManyMutationInput, SiteProfileUncheckedUpdateManyInput>
    /**
     * Filter which SiteProfiles to update
     */
    where?: SiteProfileWhereInput
    /**
     * Limit how many SiteProfiles to update.
     */
    limit?: number
  }

  /**
   * SiteProfile updateManyAndReturn
   */
  export type SiteProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * The data used to update SiteProfiles.
     */
    data: XOR<SiteProfileUpdateManyMutationInput, SiteProfileUncheckedUpdateManyInput>
    /**
     * Filter which SiteProfiles to update
     */
    where?: SiteProfileWhereInput
    /**
     * Limit how many SiteProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SiteProfile upsert
   */
  export type SiteProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the SiteProfile to update in case it exists.
     */
    where: SiteProfileWhereUniqueInput
    /**
     * In case the SiteProfile found by the `where` argument doesn't exist, create a new SiteProfile with this data.
     */
    create: XOR<SiteProfileCreateInput, SiteProfileUncheckedCreateInput>
    /**
     * In case the SiteProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteProfileUpdateInput, SiteProfileUncheckedUpdateInput>
  }

  /**
   * SiteProfile delete
   */
  export type SiteProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
    /**
     * Filter which SiteProfile to delete.
     */
    where: SiteProfileWhereUniqueInput
  }

  /**
   * SiteProfile deleteMany
   */
  export type SiteProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteProfiles to delete
     */
    where?: SiteProfileWhereInput
    /**
     * Limit how many SiteProfiles to delete.
     */
    limit?: number
  }

  /**
   * SiteProfile without action
   */
  export type SiteProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteProfile
     */
    select?: SiteProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteProfile
     */
    omit?: SiteProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiteProfileInclude<ExtArgs> | null
  }


  /**
   * Model Program
   */

  export type AggregateProgram = {
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  export type ProgramAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type ProgramSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type ProgramMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    title: string | null
    ageRange: string | null
    iconUrl: string | null
    features: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    title: string | null
    ageRange: string | null
    iconUrl: string | null
    features: string | null
    orderIndex: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProgramCountAggregateOutputType = {
    id: number
    schoolId: number
    title: number
    ageRange: number
    iconUrl: number
    features: number
    orderIndex: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProgramAvgAggregateInputType = {
    orderIndex?: true
  }

  export type ProgramSumAggregateInputType = {
    orderIndex?: true
  }

  export type ProgramMinAggregateInputType = {
    id?: true
    schoolId?: true
    title?: true
    ageRange?: true
    iconUrl?: true
    features?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramMaxAggregateInputType = {
    id?: true
    schoolId?: true
    title?: true
    ageRange?: true
    iconUrl?: true
    features?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProgramCountAggregateInputType = {
    id?: true
    schoolId?: true
    title?: true
    ageRange?: true
    iconUrl?: true
    features?: true
    orderIndex?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProgramAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Program to aggregate.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Programs
    **/
    _count?: true | ProgramCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProgramAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProgramSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProgramMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProgramMaxAggregateInputType
  }

  export type GetProgramAggregateType<T extends ProgramAggregateArgs> = {
        [P in keyof T & keyof AggregateProgram]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProgram[P]>
      : GetScalarType<T[P], AggregateProgram[P]>
  }




  export type ProgramGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProgramWhereInput
    orderBy?: ProgramOrderByWithAggregationInput | ProgramOrderByWithAggregationInput[]
    by: ProgramScalarFieldEnum[] | ProgramScalarFieldEnum
    having?: ProgramScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProgramCountAggregateInputType | true
    _avg?: ProgramAvgAggregateInputType
    _sum?: ProgramSumAggregateInputType
    _min?: ProgramMinAggregateInputType
    _max?: ProgramMaxAggregateInputType
  }

  export type ProgramGroupByOutputType = {
    id: string
    schoolId: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex: number
    createdAt: Date
    updatedAt: Date
    _count: ProgramCountAggregateOutputType | null
    _avg: ProgramAvgAggregateOutputType | null
    _sum: ProgramSumAggregateOutputType | null
    _min: ProgramMinAggregateOutputType | null
    _max: ProgramMaxAggregateOutputType | null
  }

  type GetProgramGroupByPayload<T extends ProgramGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProgramGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProgramGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProgramGroupByOutputType[P]>
            : GetScalarType<T[P], ProgramGroupByOutputType[P]>
        }
      >
    >


  export type ProgramSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    title?: boolean
    ageRange?: boolean
    iconUrl?: boolean
    features?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    title?: boolean
    ageRange?: boolean
    iconUrl?: boolean
    features?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    title?: boolean
    ageRange?: boolean
    iconUrl?: boolean
    features?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["program"]>

  export type ProgramSelectScalar = {
    id?: boolean
    schoolId?: boolean
    title?: boolean
    ageRange?: boolean
    iconUrl?: boolean
    features?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProgramOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolId" | "title" | "ageRange" | "iconUrl" | "features" | "orderIndex" | "createdAt" | "updatedAt", ExtArgs["result"]["program"]>
  export type ProgramInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type ProgramIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $ProgramPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Program"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      title: string
      ageRange: string
      iconUrl: string
      features: string
      orderIndex: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["program"]>
    composites: {}
  }

  type ProgramGetPayload<S extends boolean | null | undefined | ProgramDefaultArgs> = $Result.GetResult<Prisma.$ProgramPayload, S>

  type ProgramCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProgramFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProgramCountAggregateInputType | true
    }

  export interface ProgramDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Program'], meta: { name: 'Program' } }
    /**
     * Find zero or one Program that matches the filter.
     * @param {ProgramFindUniqueArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProgramFindUniqueArgs>(args: SelectSubset<T, ProgramFindUniqueArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Program that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProgramFindUniqueOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProgramFindUniqueOrThrowArgs>(args: SelectSubset<T, ProgramFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Program that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProgramFindFirstArgs>(args?: SelectSubset<T, ProgramFindFirstArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Program that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindFirstOrThrowArgs} args - Arguments to find a Program
     * @example
     * // Get one Program
     * const program = await prisma.program.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProgramFindFirstOrThrowArgs>(args?: SelectSubset<T, ProgramFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Programs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Programs
     * const programs = await prisma.program.findMany()
     * 
     * // Get first 10 Programs
     * const programs = await prisma.program.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const programWithIdOnly = await prisma.program.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProgramFindManyArgs>(args?: SelectSubset<T, ProgramFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Program.
     * @param {ProgramCreateArgs} args - Arguments to create a Program.
     * @example
     * // Create one Program
     * const Program = await prisma.program.create({
     *   data: {
     *     // ... data to create a Program
     *   }
     * })
     * 
     */
    create<T extends ProgramCreateArgs>(args: SelectSubset<T, ProgramCreateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Programs.
     * @param {ProgramCreateManyArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProgramCreateManyArgs>(args?: SelectSubset<T, ProgramCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Programs and returns the data saved in the database.
     * @param {ProgramCreateManyAndReturnArgs} args - Arguments to create many Programs.
     * @example
     * // Create many Programs
     * const program = await prisma.program.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProgramCreateManyAndReturnArgs>(args?: SelectSubset<T, ProgramCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Program.
     * @param {ProgramDeleteArgs} args - Arguments to delete one Program.
     * @example
     * // Delete one Program
     * const Program = await prisma.program.delete({
     *   where: {
     *     // ... filter to delete one Program
     *   }
     * })
     * 
     */
    delete<T extends ProgramDeleteArgs>(args: SelectSubset<T, ProgramDeleteArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Program.
     * @param {ProgramUpdateArgs} args - Arguments to update one Program.
     * @example
     * // Update one Program
     * const program = await prisma.program.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProgramUpdateArgs>(args: SelectSubset<T, ProgramUpdateArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Programs.
     * @param {ProgramDeleteManyArgs} args - Arguments to filter Programs to delete.
     * @example
     * // Delete a few Programs
     * const { count } = await prisma.program.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProgramDeleteManyArgs>(args?: SelectSubset<T, ProgramDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProgramUpdateManyArgs>(args: SelectSubset<T, ProgramUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Programs and returns the data updated in the database.
     * @param {ProgramUpdateManyAndReturnArgs} args - Arguments to update many Programs.
     * @example
     * // Update many Programs
     * const program = await prisma.program.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Programs and only return the `id`
     * const programWithIdOnly = await prisma.program.updateManyAndReturn({
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
    updateManyAndReturn<T extends ProgramUpdateManyAndReturnArgs>(args: SelectSubset<T, ProgramUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Program.
     * @param {ProgramUpsertArgs} args - Arguments to update or create a Program.
     * @example
     * // Update or create a Program
     * const program = await prisma.program.upsert({
     *   create: {
     *     // ... data to create a Program
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Program we want to update
     *   }
     * })
     */
    upsert<T extends ProgramUpsertArgs>(args: SelectSubset<T, ProgramUpsertArgs<ExtArgs>>): Prisma__ProgramClient<$Result.GetResult<Prisma.$ProgramPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Programs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramCountArgs} args - Arguments to filter Programs to count.
     * @example
     * // Count the number of Programs
     * const count = await prisma.program.count({
     *   where: {
     *     // ... the filter for the Programs we want to count
     *   }
     * })
    **/
    count<T extends ProgramCountArgs>(
      args?: Subset<T, ProgramCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProgramCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProgramAggregateArgs>(args: Subset<T, ProgramAggregateArgs>): Prisma.PrismaPromise<GetProgramAggregateType<T>>

    /**
     * Group by Program.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProgramGroupByArgs} args - Group by arguments.
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
      T extends ProgramGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProgramGroupByArgs['orderBy'] }
        : { orderBy?: ProgramGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ProgramGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProgramGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Program model
   */
  readonly fields: ProgramFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Program.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProgramClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the Program model
   */ 
  interface ProgramFieldRefs {
    readonly id: FieldRef<"Program", 'String'>
    readonly schoolId: FieldRef<"Program", 'String'>
    readonly title: FieldRef<"Program", 'String'>
    readonly ageRange: FieldRef<"Program", 'String'>
    readonly iconUrl: FieldRef<"Program", 'String'>
    readonly features: FieldRef<"Program", 'String'>
    readonly orderIndex: FieldRef<"Program", 'Int'>
    readonly createdAt: FieldRef<"Program", 'DateTime'>
    readonly updatedAt: FieldRef<"Program", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Program findUnique
   */
  export type ProgramFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findUniqueOrThrow
   */
  export type ProgramFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program findFirst
   */
  export type ProgramFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findFirstOrThrow
   */
  export type ProgramFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Program to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Programs.
     */
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program findMany
   */
  export type ProgramFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter, which Programs to fetch.
     */
    where?: ProgramWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Programs to fetch.
     */
    orderBy?: ProgramOrderByWithRelationInput | ProgramOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Programs.
     */
    cursor?: ProgramWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Programs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Programs.
     */
    skip?: number
    distinct?: ProgramScalarFieldEnum | ProgramScalarFieldEnum[]
  }

  /**
   * Program create
   */
  export type ProgramCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to create a Program.
     */
    data: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
  }

  /**
   * Program createMany
   */
  export type ProgramCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Program createManyAndReturn
   */
  export type ProgramCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to create many Programs.
     */
    data: ProgramCreateManyInput | ProgramCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program update
   */
  export type ProgramUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The data needed to update a Program.
     */
    data: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
    /**
     * Choose, which Program to update.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program updateMany
   */
  export type ProgramUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
  }

  /**
   * Program updateManyAndReturn
   */
  export type ProgramUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * The data used to update Programs.
     */
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyInput>
    /**
     * Filter which Programs to update
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Program upsert
   */
  export type ProgramUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * The filter to search for the Program to update in case it exists.
     */
    where: ProgramWhereUniqueInput
    /**
     * In case the Program found by the `where` argument doesn't exist, create a new Program with this data.
     */
    create: XOR<ProgramCreateInput, ProgramUncheckedCreateInput>
    /**
     * In case the Program was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProgramUpdateInput, ProgramUncheckedUpdateInput>
  }

  /**
   * Program delete
   */
  export type ProgramDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
    /**
     * Filter which Program to delete.
     */
    where: ProgramWhereUniqueInput
  }

  /**
   * Program deleteMany
   */
  export type ProgramDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Programs to delete
     */
    where?: ProgramWhereInput
    /**
     * Limit how many Programs to delete.
     */
    limit?: number
  }

  /**
   * Program without action
   */
  export type ProgramDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Program
     */
    select?: ProgramSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Program
     */
    omit?: ProgramOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProgramInclude<ExtArgs> | null
  }


  /**
   * Model GalleryItem
   */

  export type AggregateGalleryItem = {
    _count: GalleryItemCountAggregateOutputType | null
    _avg: GalleryItemAvgAggregateOutputType | null
    _sum: GalleryItemSumAggregateOutputType | null
    _min: GalleryItemMinAggregateOutputType | null
    _max: GalleryItemMaxAggregateOutputType | null
  }

  export type GalleryItemAvgAggregateOutputType = {
    orderIndex: number | null
  }

  export type GalleryItemSumAggregateOutputType = {
    orderIndex: number | null
  }

  export type GalleryItemMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    title: string | null
    imageUrl: string | null
    folder: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type GalleryItemMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    title: string | null
    imageUrl: string | null
    folder: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type GalleryItemCountAggregateOutputType = {
    id: number
    schoolId: number
    title: number
    imageUrl: number
    folder: number
    orderIndex: number
    createdAt: number
    _all: number
  }


  export type GalleryItemAvgAggregateInputType = {
    orderIndex?: true
  }

  export type GalleryItemSumAggregateInputType = {
    orderIndex?: true
  }

  export type GalleryItemMinAggregateInputType = {
    id?: true
    schoolId?: true
    title?: true
    imageUrl?: true
    folder?: true
    orderIndex?: true
    createdAt?: true
  }

  export type GalleryItemMaxAggregateInputType = {
    id?: true
    schoolId?: true
    title?: true
    imageUrl?: true
    folder?: true
    orderIndex?: true
    createdAt?: true
  }

  export type GalleryItemCountAggregateInputType = {
    id?: true
    schoolId?: true
    title?: true
    imageUrl?: true
    folder?: true
    orderIndex?: true
    createdAt?: true
    _all?: true
  }

  export type GalleryItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryItem to aggregate.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GalleryItems
    **/
    _count?: true | GalleryItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GalleryItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GalleryItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GalleryItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GalleryItemMaxAggregateInputType
  }

  export type GetGalleryItemAggregateType<T extends GalleryItemAggregateArgs> = {
        [P in keyof T & keyof AggregateGalleryItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGalleryItem[P]>
      : GetScalarType<T[P], AggregateGalleryItem[P]>
  }




  export type GalleryItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GalleryItemWhereInput
    orderBy?: GalleryItemOrderByWithAggregationInput | GalleryItemOrderByWithAggregationInput[]
    by: GalleryItemScalarFieldEnum[] | GalleryItemScalarFieldEnum
    having?: GalleryItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GalleryItemCountAggregateInputType | true
    _avg?: GalleryItemAvgAggregateInputType
    _sum?: GalleryItemSumAggregateInputType
    _min?: GalleryItemMinAggregateInputType
    _max?: GalleryItemMaxAggregateInputType
  }

  export type GalleryItemGroupByOutputType = {
    id: string
    schoolId: string
    title: string
    imageUrl: string
    folder: string
    orderIndex: number
    createdAt: Date
    _count: GalleryItemCountAggregateOutputType | null
    _avg: GalleryItemAvgAggregateOutputType | null
    _sum: GalleryItemSumAggregateOutputType | null
    _min: GalleryItemMinAggregateOutputType | null
    _max: GalleryItemMaxAggregateOutputType | null
  }

  type GetGalleryItemGroupByPayload<T extends GalleryItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GalleryItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GalleryItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GalleryItemGroupByOutputType[P]>
            : GetScalarType<T[P], GalleryItemGroupByOutputType[P]>
        }
      >
    >


  export type GalleryItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    title?: boolean
    imageUrl?: boolean
    folder?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryItem"]>

  export type GalleryItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    title?: boolean
    imageUrl?: boolean
    folder?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryItem"]>

  export type GalleryItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    title?: boolean
    imageUrl?: boolean
    folder?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["galleryItem"]>

  export type GalleryItemSelectScalar = {
    id?: boolean
    schoolId?: boolean
    title?: boolean
    imageUrl?: boolean
    folder?: boolean
    orderIndex?: boolean
    createdAt?: boolean
  }

  export type GalleryItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolId" | "title" | "imageUrl" | "folder" | "orderIndex" | "createdAt", ExtArgs["result"]["galleryItem"]>
  export type GalleryItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type GalleryItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type GalleryItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $GalleryItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GalleryItem"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      title: string
      imageUrl: string
      folder: string
      orderIndex: number
      createdAt: Date
    }, ExtArgs["result"]["galleryItem"]>
    composites: {}
  }

  type GalleryItemGetPayload<S extends boolean | null | undefined | GalleryItemDefaultArgs> = $Result.GetResult<Prisma.$GalleryItemPayload, S>

  type GalleryItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GalleryItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GalleryItemCountAggregateInputType | true
    }

  export interface GalleryItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GalleryItem'], meta: { name: 'GalleryItem' } }
    /**
     * Find zero or one GalleryItem that matches the filter.
     * @param {GalleryItemFindUniqueArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GalleryItemFindUniqueArgs>(args: SelectSubset<T, GalleryItemFindUniqueArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one GalleryItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GalleryItemFindUniqueOrThrowArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GalleryItemFindUniqueOrThrowArgs>(args: SelectSubset<T, GalleryItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first GalleryItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemFindFirstArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GalleryItemFindFirstArgs>(args?: SelectSubset<T, GalleryItemFindFirstArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first GalleryItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemFindFirstOrThrowArgs} args - Arguments to find a GalleryItem
     * @example
     * // Get one GalleryItem
     * const galleryItem = await prisma.galleryItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GalleryItemFindFirstOrThrowArgs>(args?: SelectSubset<T, GalleryItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more GalleryItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GalleryItems
     * const galleryItems = await prisma.galleryItem.findMany()
     * 
     * // Get first 10 GalleryItems
     * const galleryItems = await prisma.galleryItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const galleryItemWithIdOnly = await prisma.galleryItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GalleryItemFindManyArgs>(args?: SelectSubset<T, GalleryItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a GalleryItem.
     * @param {GalleryItemCreateArgs} args - Arguments to create a GalleryItem.
     * @example
     * // Create one GalleryItem
     * const GalleryItem = await prisma.galleryItem.create({
     *   data: {
     *     // ... data to create a GalleryItem
     *   }
     * })
     * 
     */
    create<T extends GalleryItemCreateArgs>(args: SelectSubset<T, GalleryItemCreateArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many GalleryItems.
     * @param {GalleryItemCreateManyArgs} args - Arguments to create many GalleryItems.
     * @example
     * // Create many GalleryItems
     * const galleryItem = await prisma.galleryItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GalleryItemCreateManyArgs>(args?: SelectSubset<T, GalleryItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GalleryItems and returns the data saved in the database.
     * @param {GalleryItemCreateManyAndReturnArgs} args - Arguments to create many GalleryItems.
     * @example
     * // Create many GalleryItems
     * const galleryItem = await prisma.galleryItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GalleryItems and only return the `id`
     * const galleryItemWithIdOnly = await prisma.galleryItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GalleryItemCreateManyAndReturnArgs>(args?: SelectSubset<T, GalleryItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a GalleryItem.
     * @param {GalleryItemDeleteArgs} args - Arguments to delete one GalleryItem.
     * @example
     * // Delete one GalleryItem
     * const GalleryItem = await prisma.galleryItem.delete({
     *   where: {
     *     // ... filter to delete one GalleryItem
     *   }
     * })
     * 
     */
    delete<T extends GalleryItemDeleteArgs>(args: SelectSubset<T, GalleryItemDeleteArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one GalleryItem.
     * @param {GalleryItemUpdateArgs} args - Arguments to update one GalleryItem.
     * @example
     * // Update one GalleryItem
     * const galleryItem = await prisma.galleryItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GalleryItemUpdateArgs>(args: SelectSubset<T, GalleryItemUpdateArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more GalleryItems.
     * @param {GalleryItemDeleteManyArgs} args - Arguments to filter GalleryItems to delete.
     * @example
     * // Delete a few GalleryItems
     * const { count } = await prisma.galleryItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GalleryItemDeleteManyArgs>(args?: SelectSubset<T, GalleryItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GalleryItems
     * const galleryItem = await prisma.galleryItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GalleryItemUpdateManyArgs>(args: SelectSubset<T, GalleryItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GalleryItems and returns the data updated in the database.
     * @param {GalleryItemUpdateManyAndReturnArgs} args - Arguments to update many GalleryItems.
     * @example
     * // Update many GalleryItems
     * const galleryItem = await prisma.galleryItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GalleryItems and only return the `id`
     * const galleryItemWithIdOnly = await prisma.galleryItem.updateManyAndReturn({
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
    updateManyAndReturn<T extends GalleryItemUpdateManyAndReturnArgs>(args: SelectSubset<T, GalleryItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one GalleryItem.
     * @param {GalleryItemUpsertArgs} args - Arguments to update or create a GalleryItem.
     * @example
     * // Update or create a GalleryItem
     * const galleryItem = await prisma.galleryItem.upsert({
     *   create: {
     *     // ... data to create a GalleryItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GalleryItem we want to update
     *   }
     * })
     */
    upsert<T extends GalleryItemUpsertArgs>(args: SelectSubset<T, GalleryItemUpsertArgs<ExtArgs>>): Prisma__GalleryItemClient<$Result.GetResult<Prisma.$GalleryItemPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of GalleryItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemCountArgs} args - Arguments to filter GalleryItems to count.
     * @example
     * // Count the number of GalleryItems
     * const count = await prisma.galleryItem.count({
     *   where: {
     *     // ... the filter for the GalleryItems we want to count
     *   }
     * })
    **/
    count<T extends GalleryItemCountArgs>(
      args?: Subset<T, GalleryItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GalleryItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GalleryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GalleryItemAggregateArgs>(args: Subset<T, GalleryItemAggregateArgs>): Prisma.PrismaPromise<GetGalleryItemAggregateType<T>>

    /**
     * Group by GalleryItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GalleryItemGroupByArgs} args - Group by arguments.
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
      T extends GalleryItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GalleryItemGroupByArgs['orderBy'] }
        : { orderBy?: GalleryItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, GalleryItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGalleryItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GalleryItem model
   */
  readonly fields: GalleryItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GalleryItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GalleryItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the GalleryItem model
   */ 
  interface GalleryItemFieldRefs {
    readonly id: FieldRef<"GalleryItem", 'String'>
    readonly schoolId: FieldRef<"GalleryItem", 'String'>
    readonly title: FieldRef<"GalleryItem", 'String'>
    readonly imageUrl: FieldRef<"GalleryItem", 'String'>
    readonly folder: FieldRef<"GalleryItem", 'String'>
    readonly orderIndex: FieldRef<"GalleryItem", 'Int'>
    readonly createdAt: FieldRef<"GalleryItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GalleryItem findUnique
   */
  export type GalleryItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem findUniqueOrThrow
   */
  export type GalleryItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem findFirst
   */
  export type GalleryItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryItems.
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryItems.
     */
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * GalleryItem findFirstOrThrow
   */
  export type GalleryItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * Filter, which GalleryItem to fetch.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GalleryItems.
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GalleryItems.
     */
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * GalleryItem findMany
   */
  export type GalleryItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * Filter, which GalleryItems to fetch.
     */
    where?: GalleryItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GalleryItems to fetch.
     */
    orderBy?: GalleryItemOrderByWithRelationInput | GalleryItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GalleryItems.
     */
    cursor?: GalleryItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GalleryItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GalleryItems.
     */
    skip?: number
    distinct?: GalleryItemScalarFieldEnum | GalleryItemScalarFieldEnum[]
  }

  /**
   * GalleryItem create
   */
  export type GalleryItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * The data needed to create a GalleryItem.
     */
    data: XOR<GalleryItemCreateInput, GalleryItemUncheckedCreateInput>
  }

  /**
   * GalleryItem createMany
   */
  export type GalleryItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GalleryItems.
     */
    data: GalleryItemCreateManyInput | GalleryItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GalleryItem createManyAndReturn
   */
  export type GalleryItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * The data used to create many GalleryItems.
     */
    data: GalleryItemCreateManyInput | GalleryItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GalleryItem update
   */
  export type GalleryItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * The data needed to update a GalleryItem.
     */
    data: XOR<GalleryItemUpdateInput, GalleryItemUncheckedUpdateInput>
    /**
     * Choose, which GalleryItem to update.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem updateMany
   */
  export type GalleryItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GalleryItems.
     */
    data: XOR<GalleryItemUpdateManyMutationInput, GalleryItemUncheckedUpdateManyInput>
    /**
     * Filter which GalleryItems to update
     */
    where?: GalleryItemWhereInput
    /**
     * Limit how many GalleryItems to update.
     */
    limit?: number
  }

  /**
   * GalleryItem updateManyAndReturn
   */
  export type GalleryItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * The data used to update GalleryItems.
     */
    data: XOR<GalleryItemUpdateManyMutationInput, GalleryItemUncheckedUpdateManyInput>
    /**
     * Filter which GalleryItems to update
     */
    where?: GalleryItemWhereInput
    /**
     * Limit how many GalleryItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GalleryItem upsert
   */
  export type GalleryItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * The filter to search for the GalleryItem to update in case it exists.
     */
    where: GalleryItemWhereUniqueInput
    /**
     * In case the GalleryItem found by the `where` argument doesn't exist, create a new GalleryItem with this data.
     */
    create: XOR<GalleryItemCreateInput, GalleryItemUncheckedCreateInput>
    /**
     * In case the GalleryItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GalleryItemUpdateInput, GalleryItemUncheckedUpdateInput>
  }

  /**
   * GalleryItem delete
   */
  export type GalleryItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
    /**
     * Filter which GalleryItem to delete.
     */
    where: GalleryItemWhereUniqueInput
  }

  /**
   * GalleryItem deleteMany
   */
  export type GalleryItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GalleryItems to delete
     */
    where?: GalleryItemWhereInput
    /**
     * Limit how many GalleryItems to delete.
     */
    limit?: number
  }

  /**
   * GalleryItem without action
   */
  export type GalleryItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GalleryItem
     */
    select?: GalleryItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GalleryItem
     */
    omit?: GalleryItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GalleryItemInclude<ExtArgs> | null
  }


  /**
   * Model Testimonial
   */

  export type AggregateTestimonial = {
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  export type TestimonialAvgAggregateOutputType = {
    rating: number | null
    orderIndex: number | null
  }

  export type TestimonialSumAggregateOutputType = {
    rating: number | null
    orderIndex: number | null
  }

  export type TestimonialMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    parentName: string | null
    role: string | null
    initials: string | null
    content: string | null
    rating: number | null
    bgColor: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type TestimonialMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    parentName: string | null
    role: string | null
    initials: string | null
    content: string | null
    rating: number | null
    bgColor: string | null
    orderIndex: number | null
    createdAt: Date | null
  }

  export type TestimonialCountAggregateOutputType = {
    id: number
    schoolId: number
    parentName: number
    role: number
    initials: number
    content: number
    rating: number
    bgColor: number
    orderIndex: number
    createdAt: number
    _all: number
  }


  export type TestimonialAvgAggregateInputType = {
    rating?: true
    orderIndex?: true
  }

  export type TestimonialSumAggregateInputType = {
    rating?: true
    orderIndex?: true
  }

  export type TestimonialMinAggregateInputType = {
    id?: true
    schoolId?: true
    parentName?: true
    role?: true
    initials?: true
    content?: true
    rating?: true
    bgColor?: true
    orderIndex?: true
    createdAt?: true
  }

  export type TestimonialMaxAggregateInputType = {
    id?: true
    schoolId?: true
    parentName?: true
    role?: true
    initials?: true
    content?: true
    rating?: true
    bgColor?: true
    orderIndex?: true
    createdAt?: true
  }

  export type TestimonialCountAggregateInputType = {
    id?: true
    schoolId?: true
    parentName?: true
    role?: true
    initials?: true
    content?: true
    rating?: true
    bgColor?: true
    orderIndex?: true
    createdAt?: true
    _all?: true
  }

  export type TestimonialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonial to aggregate.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Testimonials
    **/
    _count?: true | TestimonialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestimonialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestimonialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestimonialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestimonialMaxAggregateInputType
  }

  export type GetTestimonialAggregateType<T extends TestimonialAggregateArgs> = {
        [P in keyof T & keyof AggregateTestimonial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestimonial[P]>
      : GetScalarType<T[P], AggregateTestimonial[P]>
  }




  export type TestimonialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithAggregationInput | TestimonialOrderByWithAggregationInput[]
    by: TestimonialScalarFieldEnum[] | TestimonialScalarFieldEnum
    having?: TestimonialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestimonialCountAggregateInputType | true
    _avg?: TestimonialAvgAggregateInputType
    _sum?: TestimonialSumAggregateInputType
    _min?: TestimonialMinAggregateInputType
    _max?: TestimonialMaxAggregateInputType
  }

  export type TestimonialGroupByOutputType = {
    id: string
    schoolId: string
    parentName: string
    role: string
    initials: string
    content: string
    rating: number
    bgColor: string
    orderIndex: number
    createdAt: Date
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  type GetTestimonialGroupByPayload<T extends TestimonialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestimonialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestimonialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
            : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
        }
      >
    >


  export type TestimonialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    parentName?: boolean
    role?: boolean
    initials?: boolean
    content?: boolean
    rating?: boolean
    bgColor?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testimonial"]>

  export type TestimonialSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    parentName?: boolean
    role?: boolean
    initials?: boolean
    content?: boolean
    rating?: boolean
    bgColor?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testimonial"]>

  export type TestimonialSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    parentName?: boolean
    role?: boolean
    initials?: boolean
    content?: boolean
    rating?: boolean
    bgColor?: boolean
    orderIndex?: boolean
    createdAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["testimonial"]>

  export type TestimonialSelectScalar = {
    id?: boolean
    schoolId?: boolean
    parentName?: boolean
    role?: boolean
    initials?: boolean
    content?: boolean
    rating?: boolean
    bgColor?: boolean
    orderIndex?: boolean
    createdAt?: boolean
  }

  export type TestimonialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolId" | "parentName" | "role" | "initials" | "content" | "rating" | "bgColor" | "orderIndex" | "createdAt", ExtArgs["result"]["testimonial"]>
  export type TestimonialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type TestimonialIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type TestimonialIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $TestimonialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Testimonial"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      parentName: string
      role: string
      initials: string
      content: string
      rating: number
      bgColor: string
      orderIndex: number
      createdAt: Date
    }, ExtArgs["result"]["testimonial"]>
    composites: {}
  }

  type TestimonialGetPayload<S extends boolean | null | undefined | TestimonialDefaultArgs> = $Result.GetResult<Prisma.$TestimonialPayload, S>

  type TestimonialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestimonialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestimonialCountAggregateInputType | true
    }

  export interface TestimonialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Testimonial'], meta: { name: 'Testimonial' } }
    /**
     * Find zero or one Testimonial that matches the filter.
     * @param {TestimonialFindUniqueArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestimonialFindUniqueArgs>(args: SelectSubset<T, TestimonialFindUniqueArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Testimonial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestimonialFindUniqueOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestimonialFindUniqueOrThrowArgs>(args: SelectSubset<T, TestimonialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Testimonial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestimonialFindFirstArgs>(args?: SelectSubset<T, TestimonialFindFirstArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Testimonial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestimonialFindFirstOrThrowArgs>(args?: SelectSubset<T, TestimonialFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Testimonials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Testimonials
     * const testimonials = await prisma.testimonial.findMany()
     * 
     * // Get first 10 Testimonials
     * const testimonials = await prisma.testimonial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestimonialFindManyArgs>(args?: SelectSubset<T, TestimonialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Testimonial.
     * @param {TestimonialCreateArgs} args - Arguments to create a Testimonial.
     * @example
     * // Create one Testimonial
     * const Testimonial = await prisma.testimonial.create({
     *   data: {
     *     // ... data to create a Testimonial
     *   }
     * })
     * 
     */
    create<T extends TestimonialCreateArgs>(args: SelectSubset<T, TestimonialCreateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Testimonials.
     * @param {TestimonialCreateManyArgs} args - Arguments to create many Testimonials.
     * @example
     * // Create many Testimonials
     * const testimonial = await prisma.testimonial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestimonialCreateManyArgs>(args?: SelectSubset<T, TestimonialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Testimonials and returns the data saved in the database.
     * @param {TestimonialCreateManyAndReturnArgs} args - Arguments to create many Testimonials.
     * @example
     * // Create many Testimonials
     * const testimonial = await prisma.testimonial.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Testimonials and only return the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TestimonialCreateManyAndReturnArgs>(args?: SelectSubset<T, TestimonialCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Testimonial.
     * @param {TestimonialDeleteArgs} args - Arguments to delete one Testimonial.
     * @example
     * // Delete one Testimonial
     * const Testimonial = await prisma.testimonial.delete({
     *   where: {
     *     // ... filter to delete one Testimonial
     *   }
     * })
     * 
     */
    delete<T extends TestimonialDeleteArgs>(args: SelectSubset<T, TestimonialDeleteArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Testimonial.
     * @param {TestimonialUpdateArgs} args - Arguments to update one Testimonial.
     * @example
     * // Update one Testimonial
     * const testimonial = await prisma.testimonial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestimonialUpdateArgs>(args: SelectSubset<T, TestimonialUpdateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Testimonials.
     * @param {TestimonialDeleteManyArgs} args - Arguments to filter Testimonials to delete.
     * @example
     * // Delete a few Testimonials
     * const { count } = await prisma.testimonial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestimonialDeleteManyArgs>(args?: SelectSubset<T, TestimonialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Testimonials
     * const testimonial = await prisma.testimonial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestimonialUpdateManyArgs>(args: SelectSubset<T, TestimonialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testimonials and returns the data updated in the database.
     * @param {TestimonialUpdateManyAndReturnArgs} args - Arguments to update many Testimonials.
     * @example
     * // Update many Testimonials
     * const testimonial = await prisma.testimonial.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Testimonials and only return the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.updateManyAndReturn({
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
    updateManyAndReturn<T extends TestimonialUpdateManyAndReturnArgs>(args: SelectSubset<T, TestimonialUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Testimonial.
     * @param {TestimonialUpsertArgs} args - Arguments to update or create a Testimonial.
     * @example
     * // Update or create a Testimonial
     * const testimonial = await prisma.testimonial.upsert({
     *   create: {
     *     // ... data to create a Testimonial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Testimonial we want to update
     *   }
     * })
     */
    upsert<T extends TestimonialUpsertArgs>(args: SelectSubset<T, TestimonialUpsertArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialCountArgs} args - Arguments to filter Testimonials to count.
     * @example
     * // Count the number of Testimonials
     * const count = await prisma.testimonial.count({
     *   where: {
     *     // ... the filter for the Testimonials we want to count
     *   }
     * })
    **/
    count<T extends TestimonialCountArgs>(
      args?: Subset<T, TestimonialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestimonialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TestimonialAggregateArgs>(args: Subset<T, TestimonialAggregateArgs>): Prisma.PrismaPromise<GetTestimonialAggregateType<T>>

    /**
     * Group by Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialGroupByArgs} args - Group by arguments.
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
      T extends TestimonialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestimonialGroupByArgs['orderBy'] }
        : { orderBy?: TestimonialGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TestimonialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestimonialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Testimonial model
   */
  readonly fields: TestimonialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Testimonial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestimonialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the Testimonial model
   */ 
  interface TestimonialFieldRefs {
    readonly id: FieldRef<"Testimonial", 'String'>
    readonly schoolId: FieldRef<"Testimonial", 'String'>
    readonly parentName: FieldRef<"Testimonial", 'String'>
    readonly role: FieldRef<"Testimonial", 'String'>
    readonly initials: FieldRef<"Testimonial", 'String'>
    readonly content: FieldRef<"Testimonial", 'String'>
    readonly rating: FieldRef<"Testimonial", 'Int'>
    readonly bgColor: FieldRef<"Testimonial", 'String'>
    readonly orderIndex: FieldRef<"Testimonial", 'Int'>
    readonly createdAt: FieldRef<"Testimonial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Testimonial findUnique
   */
  export type TestimonialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findUniqueOrThrow
   */
  export type TestimonialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findFirst
   */
  export type TestimonialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findFirstOrThrow
   */
  export type TestimonialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findMany
   */
  export type TestimonialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonials to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial create
   */
  export type TestimonialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The data needed to create a Testimonial.
     */
    data: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
  }

  /**
   * Testimonial createMany
   */
  export type TestimonialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Testimonials.
     */
    data: TestimonialCreateManyInput | TestimonialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Testimonial createManyAndReturn
   */
  export type TestimonialCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The data used to create many Testimonials.
     */
    data: TestimonialCreateManyInput | TestimonialCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Testimonial update
   */
  export type TestimonialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The data needed to update a Testimonial.
     */
    data: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
    /**
     * Choose, which Testimonial to update.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial updateMany
   */
  export type TestimonialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Testimonials.
     */
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyInput>
    /**
     * Filter which Testimonials to update
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to update.
     */
    limit?: number
  }

  /**
   * Testimonial updateManyAndReturn
   */
  export type TestimonialUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * The data used to update Testimonials.
     */
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyInput>
    /**
     * Filter which Testimonials to update
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Testimonial upsert
   */
  export type TestimonialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The filter to search for the Testimonial to update in case it exists.
     */
    where: TestimonialWhereUniqueInput
    /**
     * In case the Testimonial found by the `where` argument doesn't exist, create a new Testimonial with this data.
     */
    create: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
    /**
     * In case the Testimonial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
  }

  /**
   * Testimonial delete
   */
  export type TestimonialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter which Testimonial to delete.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial deleteMany
   */
  export type TestimonialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonials to delete
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to delete.
     */
    limit?: number
  }

  /**
   * Testimonial without action
   */
  export type TestimonialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
  }


  /**
   * Model PpdbRegistration
   */

  export type AggregatePpdbRegistration = {
    _count: PpdbRegistrationCountAggregateOutputType | null
    _min: PpdbRegistrationMinAggregateOutputType | null
    _max: PpdbRegistrationMaxAggregateOutputType | null
  }

  export type PpdbRegistrationMinAggregateOutputType = {
    id: string | null
    schoolId: string | null
    registrationNo: string | null
    namaAnak: string | null
    jenisKelamin: string | null
    agama: string | null
    tempatLahir: string | null
    tanggalLahir: string | null
    usiaAnak: string | null
    program: string | null
    namaOrtu: string | null
    noWhatsapp: string | null
    email: string | null
    alamatRumah: string | null
    docKkUrl: string | null
    docAktaUrl: string | null
    docFotoUrl: string | null
    docKtpUrl: string | null
    buktiBayarUrl: string | null
    paymentMethod: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PpdbRegistrationMaxAggregateOutputType = {
    id: string | null
    schoolId: string | null
    registrationNo: string | null
    namaAnak: string | null
    jenisKelamin: string | null
    agama: string | null
    tempatLahir: string | null
    tanggalLahir: string | null
    usiaAnak: string | null
    program: string | null
    namaOrtu: string | null
    noWhatsapp: string | null
    email: string | null
    alamatRumah: string | null
    docKkUrl: string | null
    docAktaUrl: string | null
    docFotoUrl: string | null
    docKtpUrl: string | null
    buktiBayarUrl: string | null
    paymentMethod: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PpdbRegistrationCountAggregateOutputType = {
    id: number
    schoolId: number
    registrationNo: number
    namaAnak: number
    jenisKelamin: number
    agama: number
    tempatLahir: number
    tanggalLahir: number
    usiaAnak: number
    program: number
    namaOrtu: number
    noWhatsapp: number
    email: number
    alamatRumah: number
    docKkUrl: number
    docAktaUrl: number
    docFotoUrl: number
    docKtpUrl: number
    buktiBayarUrl: number
    paymentMethod: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PpdbRegistrationMinAggregateInputType = {
    id?: true
    schoolId?: true
    registrationNo?: true
    namaAnak?: true
    jenisKelamin?: true
    agama?: true
    tempatLahir?: true
    tanggalLahir?: true
    usiaAnak?: true
    program?: true
    namaOrtu?: true
    noWhatsapp?: true
    email?: true
    alamatRumah?: true
    docKkUrl?: true
    docAktaUrl?: true
    docFotoUrl?: true
    docKtpUrl?: true
    buktiBayarUrl?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PpdbRegistrationMaxAggregateInputType = {
    id?: true
    schoolId?: true
    registrationNo?: true
    namaAnak?: true
    jenisKelamin?: true
    agama?: true
    tempatLahir?: true
    tanggalLahir?: true
    usiaAnak?: true
    program?: true
    namaOrtu?: true
    noWhatsapp?: true
    email?: true
    alamatRumah?: true
    docKkUrl?: true
    docAktaUrl?: true
    docFotoUrl?: true
    docKtpUrl?: true
    buktiBayarUrl?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PpdbRegistrationCountAggregateInputType = {
    id?: true
    schoolId?: true
    registrationNo?: true
    namaAnak?: true
    jenisKelamin?: true
    agama?: true
    tempatLahir?: true
    tanggalLahir?: true
    usiaAnak?: true
    program?: true
    namaOrtu?: true
    noWhatsapp?: true
    email?: true
    alamatRumah?: true
    docKkUrl?: true
    docAktaUrl?: true
    docFotoUrl?: true
    docKtpUrl?: true
    buktiBayarUrl?: true
    paymentMethod?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PpdbRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PpdbRegistration to aggregate.
     */
    where?: PpdbRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PpdbRegistrations to fetch.
     */
    orderBy?: PpdbRegistrationOrderByWithRelationInput | PpdbRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PpdbRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PpdbRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PpdbRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PpdbRegistrations
    **/
    _count?: true | PpdbRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PpdbRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PpdbRegistrationMaxAggregateInputType
  }

  export type GetPpdbRegistrationAggregateType<T extends PpdbRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregatePpdbRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePpdbRegistration[P]>
      : GetScalarType<T[P], AggregatePpdbRegistration[P]>
  }




  export type PpdbRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PpdbRegistrationWhereInput
    orderBy?: PpdbRegistrationOrderByWithAggregationInput | PpdbRegistrationOrderByWithAggregationInput[]
    by: PpdbRegistrationScalarFieldEnum[] | PpdbRegistrationScalarFieldEnum
    having?: PpdbRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PpdbRegistrationCountAggregateInputType | true
    _min?: PpdbRegistrationMinAggregateInputType
    _max?: PpdbRegistrationMaxAggregateInputType
  }

  export type PpdbRegistrationGroupByOutputType = {
    id: string
    schoolId: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl: string | null
    docAktaUrl: string | null
    docFotoUrl: string | null
    docKtpUrl: string | null
    buktiBayarUrl: string | null
    paymentMethod: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: PpdbRegistrationCountAggregateOutputType | null
    _min: PpdbRegistrationMinAggregateOutputType | null
    _max: PpdbRegistrationMaxAggregateOutputType | null
  }

  type GetPpdbRegistrationGroupByPayload<T extends PpdbRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PpdbRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PpdbRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PpdbRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], PpdbRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type PpdbRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    registrationNo?: boolean
    namaAnak?: boolean
    jenisKelamin?: boolean
    agama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    usiaAnak?: boolean
    program?: boolean
    namaOrtu?: boolean
    noWhatsapp?: boolean
    email?: boolean
    alamatRumah?: boolean
    docKkUrl?: boolean
    docAktaUrl?: boolean
    docFotoUrl?: boolean
    docKtpUrl?: boolean
    buktiBayarUrl?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ppdbRegistration"]>

  export type PpdbRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    registrationNo?: boolean
    namaAnak?: boolean
    jenisKelamin?: boolean
    agama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    usiaAnak?: boolean
    program?: boolean
    namaOrtu?: boolean
    noWhatsapp?: boolean
    email?: boolean
    alamatRumah?: boolean
    docKkUrl?: boolean
    docAktaUrl?: boolean
    docFotoUrl?: boolean
    docKtpUrl?: boolean
    buktiBayarUrl?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ppdbRegistration"]>

  export type PpdbRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    schoolId?: boolean
    registrationNo?: boolean
    namaAnak?: boolean
    jenisKelamin?: boolean
    agama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    usiaAnak?: boolean
    program?: boolean
    namaOrtu?: boolean
    noWhatsapp?: boolean
    email?: boolean
    alamatRumah?: boolean
    docKkUrl?: boolean
    docAktaUrl?: boolean
    docFotoUrl?: boolean
    docKtpUrl?: boolean
    buktiBayarUrl?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ppdbRegistration"]>

  export type PpdbRegistrationSelectScalar = {
    id?: boolean
    schoolId?: boolean
    registrationNo?: boolean
    namaAnak?: boolean
    jenisKelamin?: boolean
    agama?: boolean
    tempatLahir?: boolean
    tanggalLahir?: boolean
    usiaAnak?: boolean
    program?: boolean
    namaOrtu?: boolean
    noWhatsapp?: boolean
    email?: boolean
    alamatRumah?: boolean
    docKkUrl?: boolean
    docAktaUrl?: boolean
    docFotoUrl?: boolean
    docKtpUrl?: boolean
    buktiBayarUrl?: boolean
    paymentMethod?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PpdbRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "schoolId" | "registrationNo" | "namaAnak" | "jenisKelamin" | "agama" | "tempatLahir" | "tanggalLahir" | "usiaAnak" | "program" | "namaOrtu" | "noWhatsapp" | "email" | "alamatRumah" | "docKkUrl" | "docAktaUrl" | "docFotoUrl" | "docKtpUrl" | "buktiBayarUrl" | "paymentMethod" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["ppdbRegistration"]>
  export type PpdbRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type PpdbRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type PpdbRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    school?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $PpdbRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PpdbRegistration"
    objects: {
      school: Prisma.$SchoolPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      schoolId: string
      registrationNo: string
      namaAnak: string
      jenisKelamin: string
      agama: string
      tempatLahir: string
      tanggalLahir: string
      usiaAnak: string
      program: string
      namaOrtu: string
      noWhatsapp: string
      email: string
      alamatRumah: string
      docKkUrl: string | null
      docAktaUrl: string | null
      docFotoUrl: string | null
      docKtpUrl: string | null
      buktiBayarUrl: string | null
      paymentMethod: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ppdbRegistration"]>
    composites: {}
  }

  type PpdbRegistrationGetPayload<S extends boolean | null | undefined | PpdbRegistrationDefaultArgs> = $Result.GetResult<Prisma.$PpdbRegistrationPayload, S>

  type PpdbRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PpdbRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PpdbRegistrationCountAggregateInputType | true
    }

  export interface PpdbRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PpdbRegistration'], meta: { name: 'PpdbRegistration' } }
    /**
     * Find zero or one PpdbRegistration that matches the filter.
     * @param {PpdbRegistrationFindUniqueArgs} args - Arguments to find a PpdbRegistration
     * @example
     * // Get one PpdbRegistration
     * const ppdbRegistration = await prisma.ppdbRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PpdbRegistrationFindUniqueArgs>(args: SelectSubset<T, PpdbRegistrationFindUniqueArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one PpdbRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PpdbRegistrationFindUniqueOrThrowArgs} args - Arguments to find a PpdbRegistration
     * @example
     * // Get one PpdbRegistration
     * const ppdbRegistration = await prisma.ppdbRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PpdbRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, PpdbRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first PpdbRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationFindFirstArgs} args - Arguments to find a PpdbRegistration
     * @example
     * // Get one PpdbRegistration
     * const ppdbRegistration = await prisma.ppdbRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PpdbRegistrationFindFirstArgs>(args?: SelectSubset<T, PpdbRegistrationFindFirstArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first PpdbRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationFindFirstOrThrowArgs} args - Arguments to find a PpdbRegistration
     * @example
     * // Get one PpdbRegistration
     * const ppdbRegistration = await prisma.ppdbRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PpdbRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, PpdbRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more PpdbRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PpdbRegistrations
     * const ppdbRegistrations = await prisma.ppdbRegistration.findMany()
     * 
     * // Get first 10 PpdbRegistrations
     * const ppdbRegistrations = await prisma.ppdbRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ppdbRegistrationWithIdOnly = await prisma.ppdbRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PpdbRegistrationFindManyArgs>(args?: SelectSubset<T, PpdbRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a PpdbRegistration.
     * @param {PpdbRegistrationCreateArgs} args - Arguments to create a PpdbRegistration.
     * @example
     * // Create one PpdbRegistration
     * const PpdbRegistration = await prisma.ppdbRegistration.create({
     *   data: {
     *     // ... data to create a PpdbRegistration
     *   }
     * })
     * 
     */
    create<T extends PpdbRegistrationCreateArgs>(args: SelectSubset<T, PpdbRegistrationCreateArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many PpdbRegistrations.
     * @param {PpdbRegistrationCreateManyArgs} args - Arguments to create many PpdbRegistrations.
     * @example
     * // Create many PpdbRegistrations
     * const ppdbRegistration = await prisma.ppdbRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PpdbRegistrationCreateManyArgs>(args?: SelectSubset<T, PpdbRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PpdbRegistrations and returns the data saved in the database.
     * @param {PpdbRegistrationCreateManyAndReturnArgs} args - Arguments to create many PpdbRegistrations.
     * @example
     * // Create many PpdbRegistrations
     * const ppdbRegistration = await prisma.ppdbRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PpdbRegistrations and only return the `id`
     * const ppdbRegistrationWithIdOnly = await prisma.ppdbRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PpdbRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, PpdbRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a PpdbRegistration.
     * @param {PpdbRegistrationDeleteArgs} args - Arguments to delete one PpdbRegistration.
     * @example
     * // Delete one PpdbRegistration
     * const PpdbRegistration = await prisma.ppdbRegistration.delete({
     *   where: {
     *     // ... filter to delete one PpdbRegistration
     *   }
     * })
     * 
     */
    delete<T extends PpdbRegistrationDeleteArgs>(args: SelectSubset<T, PpdbRegistrationDeleteArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one PpdbRegistration.
     * @param {PpdbRegistrationUpdateArgs} args - Arguments to update one PpdbRegistration.
     * @example
     * // Update one PpdbRegistration
     * const ppdbRegistration = await prisma.ppdbRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PpdbRegistrationUpdateArgs>(args: SelectSubset<T, PpdbRegistrationUpdateArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more PpdbRegistrations.
     * @param {PpdbRegistrationDeleteManyArgs} args - Arguments to filter PpdbRegistrations to delete.
     * @example
     * // Delete a few PpdbRegistrations
     * const { count } = await prisma.ppdbRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PpdbRegistrationDeleteManyArgs>(args?: SelectSubset<T, PpdbRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PpdbRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PpdbRegistrations
     * const ppdbRegistration = await prisma.ppdbRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PpdbRegistrationUpdateManyArgs>(args: SelectSubset<T, PpdbRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PpdbRegistrations and returns the data updated in the database.
     * @param {PpdbRegistrationUpdateManyAndReturnArgs} args - Arguments to update many PpdbRegistrations.
     * @example
     * // Update many PpdbRegistrations
     * const ppdbRegistration = await prisma.ppdbRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PpdbRegistrations and only return the `id`
     * const ppdbRegistrationWithIdOnly = await prisma.ppdbRegistration.updateManyAndReturn({
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
    updateManyAndReturn<T extends PpdbRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, PpdbRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one PpdbRegistration.
     * @param {PpdbRegistrationUpsertArgs} args - Arguments to update or create a PpdbRegistration.
     * @example
     * // Update or create a PpdbRegistration
     * const ppdbRegistration = await prisma.ppdbRegistration.upsert({
     *   create: {
     *     // ... data to create a PpdbRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PpdbRegistration we want to update
     *   }
     * })
     */
    upsert<T extends PpdbRegistrationUpsertArgs>(args: SelectSubset<T, PpdbRegistrationUpsertArgs<ExtArgs>>): Prisma__PpdbRegistrationClient<$Result.GetResult<Prisma.$PpdbRegistrationPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of PpdbRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationCountArgs} args - Arguments to filter PpdbRegistrations to count.
     * @example
     * // Count the number of PpdbRegistrations
     * const count = await prisma.ppdbRegistration.count({
     *   where: {
     *     // ... the filter for the PpdbRegistrations we want to count
     *   }
     * })
    **/
    count<T extends PpdbRegistrationCountArgs>(
      args?: Subset<T, PpdbRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PpdbRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PpdbRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PpdbRegistrationAggregateArgs>(args: Subset<T, PpdbRegistrationAggregateArgs>): Prisma.PrismaPromise<GetPpdbRegistrationAggregateType<T>>

    /**
     * Group by PpdbRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PpdbRegistrationGroupByArgs} args - Group by arguments.
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
      T extends PpdbRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PpdbRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: PpdbRegistrationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PpdbRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPpdbRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PpdbRegistration model
   */
  readonly fields: PpdbRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PpdbRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PpdbRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    school<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
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
   * Fields of the PpdbRegistration model
   */ 
  interface PpdbRegistrationFieldRefs {
    readonly id: FieldRef<"PpdbRegistration", 'String'>
    readonly schoolId: FieldRef<"PpdbRegistration", 'String'>
    readonly registrationNo: FieldRef<"PpdbRegistration", 'String'>
    readonly namaAnak: FieldRef<"PpdbRegistration", 'String'>
    readonly jenisKelamin: FieldRef<"PpdbRegistration", 'String'>
    readonly agama: FieldRef<"PpdbRegistration", 'String'>
    readonly tempatLahir: FieldRef<"PpdbRegistration", 'String'>
    readonly tanggalLahir: FieldRef<"PpdbRegistration", 'String'>
    readonly usiaAnak: FieldRef<"PpdbRegistration", 'String'>
    readonly program: FieldRef<"PpdbRegistration", 'String'>
    readonly namaOrtu: FieldRef<"PpdbRegistration", 'String'>
    readonly noWhatsapp: FieldRef<"PpdbRegistration", 'String'>
    readonly email: FieldRef<"PpdbRegistration", 'String'>
    readonly alamatRumah: FieldRef<"PpdbRegistration", 'String'>
    readonly docKkUrl: FieldRef<"PpdbRegistration", 'String'>
    readonly docAktaUrl: FieldRef<"PpdbRegistration", 'String'>
    readonly docFotoUrl: FieldRef<"PpdbRegistration", 'String'>
    readonly docKtpUrl: FieldRef<"PpdbRegistration", 'String'>
    readonly buktiBayarUrl: FieldRef<"PpdbRegistration", 'String'>
    readonly paymentMethod: FieldRef<"PpdbRegistration", 'String'>
    readonly status: FieldRef<"PpdbRegistration", 'String'>
    readonly createdAt: FieldRef<"PpdbRegistration", 'DateTime'>
    readonly updatedAt: FieldRef<"PpdbRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PpdbRegistration findUnique
   */
  export type PpdbRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which PpdbRegistration to fetch.
     */
    where: PpdbRegistrationWhereUniqueInput
  }

  /**
   * PpdbRegistration findUniqueOrThrow
   */
  export type PpdbRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which PpdbRegistration to fetch.
     */
    where: PpdbRegistrationWhereUniqueInput
  }

  /**
   * PpdbRegistration findFirst
   */
  export type PpdbRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which PpdbRegistration to fetch.
     */
    where?: PpdbRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PpdbRegistrations to fetch.
     */
    orderBy?: PpdbRegistrationOrderByWithRelationInput | PpdbRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PpdbRegistrations.
     */
    cursor?: PpdbRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PpdbRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PpdbRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PpdbRegistrations.
     */
    distinct?: PpdbRegistrationScalarFieldEnum | PpdbRegistrationScalarFieldEnum[]
  }

  /**
   * PpdbRegistration findFirstOrThrow
   */
  export type PpdbRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which PpdbRegistration to fetch.
     */
    where?: PpdbRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PpdbRegistrations to fetch.
     */
    orderBy?: PpdbRegistrationOrderByWithRelationInput | PpdbRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PpdbRegistrations.
     */
    cursor?: PpdbRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PpdbRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PpdbRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PpdbRegistrations.
     */
    distinct?: PpdbRegistrationScalarFieldEnum | PpdbRegistrationScalarFieldEnum[]
  }

  /**
   * PpdbRegistration findMany
   */
  export type PpdbRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * Filter, which PpdbRegistrations to fetch.
     */
    where?: PpdbRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PpdbRegistrations to fetch.
     */
    orderBy?: PpdbRegistrationOrderByWithRelationInput | PpdbRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PpdbRegistrations.
     */
    cursor?: PpdbRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PpdbRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PpdbRegistrations.
     */
    skip?: number
    distinct?: PpdbRegistrationScalarFieldEnum | PpdbRegistrationScalarFieldEnum[]
  }

  /**
   * PpdbRegistration create
   */
  export type PpdbRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to create a PpdbRegistration.
     */
    data: XOR<PpdbRegistrationCreateInput, PpdbRegistrationUncheckedCreateInput>
  }

  /**
   * PpdbRegistration createMany
   */
  export type PpdbRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PpdbRegistrations.
     */
    data: PpdbRegistrationCreateManyInput | PpdbRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PpdbRegistration createManyAndReturn
   */
  export type PpdbRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many PpdbRegistrations.
     */
    data: PpdbRegistrationCreateManyInput | PpdbRegistrationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PpdbRegistration update
   */
  export type PpdbRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * The data needed to update a PpdbRegistration.
     */
    data: XOR<PpdbRegistrationUpdateInput, PpdbRegistrationUncheckedUpdateInput>
    /**
     * Choose, which PpdbRegistration to update.
     */
    where: PpdbRegistrationWhereUniqueInput
  }

  /**
   * PpdbRegistration updateMany
   */
  export type PpdbRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PpdbRegistrations.
     */
    data: XOR<PpdbRegistrationUpdateManyMutationInput, PpdbRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which PpdbRegistrations to update
     */
    where?: PpdbRegistrationWhereInput
    /**
     * Limit how many PpdbRegistrations to update.
     */
    limit?: number
  }

  /**
   * PpdbRegistration updateManyAndReturn
   */
  export type PpdbRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update PpdbRegistrations.
     */
    data: XOR<PpdbRegistrationUpdateManyMutationInput, PpdbRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which PpdbRegistrations to update
     */
    where?: PpdbRegistrationWhereInput
    /**
     * Limit how many PpdbRegistrations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PpdbRegistration upsert
   */
  export type PpdbRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * The filter to search for the PpdbRegistration to update in case it exists.
     */
    where: PpdbRegistrationWhereUniqueInput
    /**
     * In case the PpdbRegistration found by the `where` argument doesn't exist, create a new PpdbRegistration with this data.
     */
    create: XOR<PpdbRegistrationCreateInput, PpdbRegistrationUncheckedCreateInput>
    /**
     * In case the PpdbRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PpdbRegistrationUpdateInput, PpdbRegistrationUncheckedUpdateInput>
  }

  /**
   * PpdbRegistration delete
   */
  export type PpdbRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
    /**
     * Filter which PpdbRegistration to delete.
     */
    where: PpdbRegistrationWhereUniqueInput
  }

  /**
   * PpdbRegistration deleteMany
   */
  export type PpdbRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PpdbRegistrations to delete
     */
    where?: PpdbRegistrationWhereInput
    /**
     * Limit how many PpdbRegistrations to delete.
     */
    limit?: number
  }

  /**
   * PpdbRegistration without action
   */
  export type PpdbRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PpdbRegistration
     */
    select?: PpdbRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PpdbRegistration
     */
    omit?: PpdbRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PpdbRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model UploadLog
   */

  export type AggregateUploadLog = {
    _count: UploadLogCountAggregateOutputType | null
    _avg: UploadLogAvgAggregateOutputType | null
    _sum: UploadLogSumAggregateOutputType | null
    _min: UploadLogMinAggregateOutputType | null
    _max: UploadLogMaxAggregateOutputType | null
  }

  export type UploadLogAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type UploadLogSumAggregateOutputType = {
    fileSize: number | null
  }

  export type UploadLogMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileFolder: string | null
    fileUrl: string | null
    fileSize: number | null
    mimeType: string | null
    createdAt: Date | null
  }

  export type UploadLogMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    fileFolder: string | null
    fileUrl: string | null
    fileSize: number | null
    mimeType: string | null
    createdAt: Date | null
  }

  export type UploadLogCountAggregateOutputType = {
    id: number
    fileName: number
    fileFolder: number
    fileUrl: number
    fileSize: number
    mimeType: number
    createdAt: number
    _all: number
  }


  export type UploadLogAvgAggregateInputType = {
    fileSize?: true
  }

  export type UploadLogSumAggregateInputType = {
    fileSize?: true
  }

  export type UploadLogMinAggregateInputType = {
    id?: true
    fileName?: true
    fileFolder?: true
    fileUrl?: true
    fileSize?: true
    mimeType?: true
    createdAt?: true
  }

  export type UploadLogMaxAggregateInputType = {
    id?: true
    fileName?: true
    fileFolder?: true
    fileUrl?: true
    fileSize?: true
    mimeType?: true
    createdAt?: true
  }

  export type UploadLogCountAggregateInputType = {
    id?: true
    fileName?: true
    fileFolder?: true
    fileUrl?: true
    fileSize?: true
    mimeType?: true
    createdAt?: true
    _all?: true
  }

  export type UploadLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadLog to aggregate.
     */
    where?: UploadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadLogs to fetch.
     */
    orderBy?: UploadLogOrderByWithRelationInput | UploadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadLogs
    **/
    _count?: true | UploadLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadLogMaxAggregateInputType
  }

  export type GetUploadLogAggregateType<T extends UploadLogAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadLog[P]>
      : GetScalarType<T[P], AggregateUploadLog[P]>
  }




  export type UploadLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadLogWhereInput
    orderBy?: UploadLogOrderByWithAggregationInput | UploadLogOrderByWithAggregationInput[]
    by: UploadLogScalarFieldEnum[] | UploadLogScalarFieldEnum
    having?: UploadLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadLogCountAggregateInputType | true
    _avg?: UploadLogAvgAggregateInputType
    _sum?: UploadLogSumAggregateInputType
    _min?: UploadLogMinAggregateInputType
    _max?: UploadLogMaxAggregateInputType
  }

  export type UploadLogGroupByOutputType = {
    id: string
    fileName: string
    fileFolder: string
    fileUrl: string
    fileSize: number | null
    mimeType: string | null
    createdAt: Date
    _count: UploadLogCountAggregateOutputType | null
    _avg: UploadLogAvgAggregateOutputType | null
    _sum: UploadLogSumAggregateOutputType | null
    _min: UploadLogMinAggregateOutputType | null
    _max: UploadLogMaxAggregateOutputType | null
  }

  type GetUploadLogGroupByPayload<T extends UploadLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadLogGroupByOutputType[P]>
            : GetScalarType<T[P], UploadLogGroupByOutputType[P]>
        }
      >
    >


  export type UploadLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileFolder?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["uploadLog"]>

  export type UploadLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileFolder?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["uploadLog"]>

  export type UploadLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    fileFolder?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["uploadLog"]>

  export type UploadLogSelectScalar = {
    id?: boolean
    fileName?: boolean
    fileFolder?: boolean
    fileUrl?: boolean
    fileSize?: boolean
    mimeType?: boolean
    createdAt?: boolean
  }

  export type UploadLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fileName" | "fileFolder" | "fileUrl" | "fileSize" | "mimeType" | "createdAt", ExtArgs["result"]["uploadLog"]>

  export type $UploadLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      fileFolder: string
      fileUrl: string
      fileSize: number | null
      mimeType: string | null
      createdAt: Date
    }, ExtArgs["result"]["uploadLog"]>
    composites: {}
  }

  type UploadLogGetPayload<S extends boolean | null | undefined | UploadLogDefaultArgs> = $Result.GetResult<Prisma.$UploadLogPayload, S>

  type UploadLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadLogCountAggregateInputType | true
    }

  export interface UploadLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadLog'], meta: { name: 'UploadLog' } }
    /**
     * Find zero or one UploadLog that matches the filter.
     * @param {UploadLogFindUniqueArgs} args - Arguments to find a UploadLog
     * @example
     * // Get one UploadLog
     * const uploadLog = await prisma.uploadLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadLogFindUniqueArgs>(args: SelectSubset<T, UploadLogFindUniqueArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one UploadLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadLogFindUniqueOrThrowArgs} args - Arguments to find a UploadLog
     * @example
     * // Get one UploadLog
     * const uploadLog = await prisma.uploadLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadLogFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first UploadLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogFindFirstArgs} args - Arguments to find a UploadLog
     * @example
     * // Get one UploadLog
     * const uploadLog = await prisma.uploadLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadLogFindFirstArgs>(args?: SelectSubset<T, UploadLogFindFirstArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first UploadLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogFindFirstOrThrowArgs} args - Arguments to find a UploadLog
     * @example
     * // Get one UploadLog
     * const uploadLog = await prisma.uploadLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadLogFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more UploadLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadLogs
     * const uploadLogs = await prisma.uploadLog.findMany()
     * 
     * // Get first 10 UploadLogs
     * const uploadLogs = await prisma.uploadLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadLogWithIdOnly = await prisma.uploadLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadLogFindManyArgs>(args?: SelectSubset<T, UploadLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a UploadLog.
     * @param {UploadLogCreateArgs} args - Arguments to create a UploadLog.
     * @example
     * // Create one UploadLog
     * const UploadLog = await prisma.uploadLog.create({
     *   data: {
     *     // ... data to create a UploadLog
     *   }
     * })
     * 
     */
    create<T extends UploadLogCreateArgs>(args: SelectSubset<T, UploadLogCreateArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many UploadLogs.
     * @param {UploadLogCreateManyArgs} args - Arguments to create many UploadLogs.
     * @example
     * // Create many UploadLogs
     * const uploadLog = await prisma.uploadLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadLogCreateManyArgs>(args?: SelectSubset<T, UploadLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UploadLogs and returns the data saved in the database.
     * @param {UploadLogCreateManyAndReturnArgs} args - Arguments to create many UploadLogs.
     * @example
     * // Create many UploadLogs
     * const uploadLog = await prisma.uploadLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UploadLogs and only return the `id`
     * const uploadLogWithIdOnly = await prisma.uploadLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UploadLogCreateManyAndReturnArgs>(args?: SelectSubset<T, UploadLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a UploadLog.
     * @param {UploadLogDeleteArgs} args - Arguments to delete one UploadLog.
     * @example
     * // Delete one UploadLog
     * const UploadLog = await prisma.uploadLog.delete({
     *   where: {
     *     // ... filter to delete one UploadLog
     *   }
     * })
     * 
     */
    delete<T extends UploadLogDeleteArgs>(args: SelectSubset<T, UploadLogDeleteArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one UploadLog.
     * @param {UploadLogUpdateArgs} args - Arguments to update one UploadLog.
     * @example
     * // Update one UploadLog
     * const uploadLog = await prisma.uploadLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadLogUpdateArgs>(args: SelectSubset<T, UploadLogUpdateArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more UploadLogs.
     * @param {UploadLogDeleteManyArgs} args - Arguments to filter UploadLogs to delete.
     * @example
     * // Delete a few UploadLogs
     * const { count } = await prisma.uploadLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadLogDeleteManyArgs>(args?: SelectSubset<T, UploadLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadLogs
     * const uploadLog = await prisma.uploadLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadLogUpdateManyArgs>(args: SelectSubset<T, UploadLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadLogs and returns the data updated in the database.
     * @param {UploadLogUpdateManyAndReturnArgs} args - Arguments to update many UploadLogs.
     * @example
     * // Update many UploadLogs
     * const uploadLog = await prisma.uploadLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UploadLogs and only return the `id`
     * const uploadLogWithIdOnly = await prisma.uploadLog.updateManyAndReturn({
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
    updateManyAndReturn<T extends UploadLogUpdateManyAndReturnArgs>(args: SelectSubset<T, UploadLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one UploadLog.
     * @param {UploadLogUpsertArgs} args - Arguments to update or create a UploadLog.
     * @example
     * // Update or create a UploadLog
     * const uploadLog = await prisma.uploadLog.upsert({
     *   create: {
     *     // ... data to create a UploadLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadLog we want to update
     *   }
     * })
     */
    upsert<T extends UploadLogUpsertArgs>(args: SelectSubset<T, UploadLogUpsertArgs<ExtArgs>>): Prisma__UploadLogClient<$Result.GetResult<Prisma.$UploadLogPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of UploadLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogCountArgs} args - Arguments to filter UploadLogs to count.
     * @example
     * // Count the number of UploadLogs
     * const count = await prisma.uploadLog.count({
     *   where: {
     *     // ... the filter for the UploadLogs we want to count
     *   }
     * })
    **/
    count<T extends UploadLogCountArgs>(
      args?: Subset<T, UploadLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UploadLogAggregateArgs>(args: Subset<T, UploadLogAggregateArgs>): Prisma.PrismaPromise<GetUploadLogAggregateType<T>>

    /**
     * Group by UploadLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadLogGroupByArgs} args - Group by arguments.
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
      T extends UploadLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadLogGroupByArgs['orderBy'] }
        : { orderBy?: UploadLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UploadLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadLog model
   */
  readonly fields: UploadLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the UploadLog model
   */ 
  interface UploadLogFieldRefs {
    readonly id: FieldRef<"UploadLog", 'String'>
    readonly fileName: FieldRef<"UploadLog", 'String'>
    readonly fileFolder: FieldRef<"UploadLog", 'String'>
    readonly fileUrl: FieldRef<"UploadLog", 'String'>
    readonly fileSize: FieldRef<"UploadLog", 'Int'>
    readonly mimeType: FieldRef<"UploadLog", 'String'>
    readonly createdAt: FieldRef<"UploadLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UploadLog findUnique
   */
  export type UploadLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * Filter, which UploadLog to fetch.
     */
    where: UploadLogWhereUniqueInput
  }

  /**
   * UploadLog findUniqueOrThrow
   */
  export type UploadLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * Filter, which UploadLog to fetch.
     */
    where: UploadLogWhereUniqueInput
  }

  /**
   * UploadLog findFirst
   */
  export type UploadLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * Filter, which UploadLog to fetch.
     */
    where?: UploadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadLogs to fetch.
     */
    orderBy?: UploadLogOrderByWithRelationInput | UploadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadLogs.
     */
    cursor?: UploadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadLogs.
     */
    distinct?: UploadLogScalarFieldEnum | UploadLogScalarFieldEnum[]
  }

  /**
   * UploadLog findFirstOrThrow
   */
  export type UploadLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * Filter, which UploadLog to fetch.
     */
    where?: UploadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadLogs to fetch.
     */
    orderBy?: UploadLogOrderByWithRelationInput | UploadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadLogs.
     */
    cursor?: UploadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadLogs.
     */
    distinct?: UploadLogScalarFieldEnum | UploadLogScalarFieldEnum[]
  }

  /**
   * UploadLog findMany
   */
  export type UploadLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * Filter, which UploadLogs to fetch.
     */
    where?: UploadLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadLogs to fetch.
     */
    orderBy?: UploadLogOrderByWithRelationInput | UploadLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadLogs.
     */
    cursor?: UploadLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadLogs.
     */
    skip?: number
    distinct?: UploadLogScalarFieldEnum | UploadLogScalarFieldEnum[]
  }

  /**
   * UploadLog create
   */
  export type UploadLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * The data needed to create a UploadLog.
     */
    data: XOR<UploadLogCreateInput, UploadLogUncheckedCreateInput>
  }

  /**
   * UploadLog createMany
   */
  export type UploadLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadLogs.
     */
    data: UploadLogCreateManyInput | UploadLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadLog createManyAndReturn
   */
  export type UploadLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * The data used to create many UploadLogs.
     */
    data: UploadLogCreateManyInput | UploadLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadLog update
   */
  export type UploadLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * The data needed to update a UploadLog.
     */
    data: XOR<UploadLogUpdateInput, UploadLogUncheckedUpdateInput>
    /**
     * Choose, which UploadLog to update.
     */
    where: UploadLogWhereUniqueInput
  }

  /**
   * UploadLog updateMany
   */
  export type UploadLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadLogs.
     */
    data: XOR<UploadLogUpdateManyMutationInput, UploadLogUncheckedUpdateManyInput>
    /**
     * Filter which UploadLogs to update
     */
    where?: UploadLogWhereInput
    /**
     * Limit how many UploadLogs to update.
     */
    limit?: number
  }

  /**
   * UploadLog updateManyAndReturn
   */
  export type UploadLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * The data used to update UploadLogs.
     */
    data: XOR<UploadLogUpdateManyMutationInput, UploadLogUncheckedUpdateManyInput>
    /**
     * Filter which UploadLogs to update
     */
    where?: UploadLogWhereInput
    /**
     * Limit how many UploadLogs to update.
     */
    limit?: number
  }

  /**
   * UploadLog upsert
   */
  export type UploadLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * The filter to search for the UploadLog to update in case it exists.
     */
    where: UploadLogWhereUniqueInput
    /**
     * In case the UploadLog found by the `where` argument doesn't exist, create a new UploadLog with this data.
     */
    create: XOR<UploadLogCreateInput, UploadLogUncheckedCreateInput>
    /**
     * In case the UploadLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadLogUpdateInput, UploadLogUncheckedUpdateInput>
  }

  /**
   * UploadLog delete
   */
  export type UploadLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
    /**
     * Filter which UploadLog to delete.
     */
    where: UploadLogWhereUniqueInput
  }

  /**
   * UploadLog deleteMany
   */
  export type UploadLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadLogs to delete
     */
    where?: UploadLogWhereInput
    /**
     * Limit how many UploadLogs to delete.
     */
    limit?: number
  }

  /**
   * UploadLog without action
   */
  export type UploadLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadLog
     */
    select?: UploadLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadLog
     */
    omit?: UploadLogOmit<ExtArgs> | null
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


  export const FoundationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    tagline: 'tagline',
    logoUrl: 'logoUrl',
    phone: 'phone',
    email: 'email',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FoundationScalarFieldEnum = (typeof FoundationScalarFieldEnum)[keyof typeof FoundationScalarFieldEnum]


  export const SchoolScalarFieldEnum: {
    id: 'id',
    foundationId: 'foundationId',
    code: 'code',
    name: 'name',
    level: 'level',
    address: 'address',
    phone: 'phone',
    logoUrl: 'logoUrl',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const AdminUserScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    username: 'username',
    passwordHash: 'passwordHash',
    name: 'name',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminUserScalarFieldEnum = (typeof AdminUserScalarFieldEnum)[keyof typeof AdminUserScalarFieldEnum]


  export const SiteProfileScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    heroBadge: 'heroBadge',
    heroTitle: 'heroTitle',
    heroSubtitle: 'heroSubtitle',
    heroMascotUrl: 'heroMascotUrl',
    ctaTitle: 'ctaTitle',
    ctaSubtitle: 'ctaSubtitle',
    phone: 'phone',
    instagram: 'instagram',
    facebook: 'facebook',
    address: 'address',
    updatedAt: 'updatedAt'
  };

  export type SiteProfileScalarFieldEnum = (typeof SiteProfileScalarFieldEnum)[keyof typeof SiteProfileScalarFieldEnum]


  export const ProgramScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    title: 'title',
    ageRange: 'ageRange',
    iconUrl: 'iconUrl',
    features: 'features',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProgramScalarFieldEnum = (typeof ProgramScalarFieldEnum)[keyof typeof ProgramScalarFieldEnum]


  export const GalleryItemScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    title: 'title',
    imageUrl: 'imageUrl',
    folder: 'folder',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt'
  };

  export type GalleryItemScalarFieldEnum = (typeof GalleryItemScalarFieldEnum)[keyof typeof GalleryItemScalarFieldEnum]


  export const TestimonialScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    parentName: 'parentName',
    role: 'role',
    initials: 'initials',
    content: 'content',
    rating: 'rating',
    bgColor: 'bgColor',
    orderIndex: 'orderIndex',
    createdAt: 'createdAt'
  };

  export type TestimonialScalarFieldEnum = (typeof TestimonialScalarFieldEnum)[keyof typeof TestimonialScalarFieldEnum]


  export const PpdbRegistrationScalarFieldEnum: {
    id: 'id',
    schoolId: 'schoolId',
    registrationNo: 'registrationNo',
    namaAnak: 'namaAnak',
    jenisKelamin: 'jenisKelamin',
    agama: 'agama',
    tempatLahir: 'tempatLahir',
    tanggalLahir: 'tanggalLahir',
    usiaAnak: 'usiaAnak',
    program: 'program',
    namaOrtu: 'namaOrtu',
    noWhatsapp: 'noWhatsapp',
    email: 'email',
    alamatRumah: 'alamatRumah',
    docKkUrl: 'docKkUrl',
    docAktaUrl: 'docAktaUrl',
    docFotoUrl: 'docFotoUrl',
    docKtpUrl: 'docKtpUrl',
    buktiBayarUrl: 'buktiBayarUrl',
    paymentMethod: 'paymentMethod',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PpdbRegistrationScalarFieldEnum = (typeof PpdbRegistrationScalarFieldEnum)[keyof typeof PpdbRegistrationScalarFieldEnum]


  export const UploadLogScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    fileFolder: 'fileFolder',
    fileUrl: 'fileUrl',
    fileSize: 'fileSize',
    mimeType: 'mimeType',
    createdAt: 'createdAt'
  };

  export type UploadLogScalarFieldEnum = (typeof UploadLogScalarFieldEnum)[keyof typeof UploadLogScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type FoundationWhereInput = {
    AND?: FoundationWhereInput | FoundationWhereInput[]
    OR?: FoundationWhereInput[]
    NOT?: FoundationWhereInput | FoundationWhereInput[]
    id?: StringFilter<"Foundation"> | string
    name?: StringFilter<"Foundation"> | string
    tagline?: StringFilter<"Foundation"> | string
    logoUrl?: StringNullableFilter<"Foundation"> | string | null
    phone?: StringNullableFilter<"Foundation"> | string | null
    email?: StringNullableFilter<"Foundation"> | string | null
    address?: StringNullableFilter<"Foundation"> | string | null
    createdAt?: DateTimeFilter<"Foundation"> | Date | string
    updatedAt?: DateTimeFilter<"Foundation"> | Date | string
    schools?: SchoolListRelationFilter
  }

  export type FoundationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    schools?: SchoolOrderByRelationAggregateInput
  }

  export type FoundationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FoundationWhereInput | FoundationWhereInput[]
    OR?: FoundationWhereInput[]
    NOT?: FoundationWhereInput | FoundationWhereInput[]
    name?: StringFilter<"Foundation"> | string
    tagline?: StringFilter<"Foundation"> | string
    logoUrl?: StringNullableFilter<"Foundation"> | string | null
    phone?: StringNullableFilter<"Foundation"> | string | null
    email?: StringNullableFilter<"Foundation"> | string | null
    address?: StringNullableFilter<"Foundation"> | string | null
    createdAt?: DateTimeFilter<"Foundation"> | Date | string
    updatedAt?: DateTimeFilter<"Foundation"> | Date | string
    schools?: SchoolListRelationFilter
  }, "id">

  export type FoundationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FoundationCountOrderByAggregateInput
    _max?: FoundationMaxOrderByAggregateInput
    _min?: FoundationMinOrderByAggregateInput
  }

  export type FoundationScalarWhereWithAggregatesInput = {
    AND?: FoundationScalarWhereWithAggregatesInput | FoundationScalarWhereWithAggregatesInput[]
    OR?: FoundationScalarWhereWithAggregatesInput[]
    NOT?: FoundationScalarWhereWithAggregatesInput | FoundationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Foundation"> | string
    name?: StringWithAggregatesFilter<"Foundation"> | string
    tagline?: StringWithAggregatesFilter<"Foundation"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Foundation"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Foundation"> | string | null
    email?: StringNullableWithAggregatesFilter<"Foundation"> | string | null
    address?: StringNullableWithAggregatesFilter<"Foundation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Foundation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Foundation"> | Date | string
  }

  export type SchoolWhereInput = {
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    id?: StringFilter<"School"> | string
    foundationId?: StringFilter<"School"> | string
    code?: StringFilter<"School"> | string
    name?: StringFilter<"School"> | string
    level?: StringFilter<"School"> | string
    address?: StringFilter<"School"> | string
    phone?: StringFilter<"School"> | string
    logoUrl?: StringNullableFilter<"School"> | string | null
    orderIndex?: IntFilter<"School"> | number
    createdAt?: DateTimeFilter<"School"> | Date | string
    updatedAt?: DateTimeFilter<"School"> | Date | string
    foundation?: XOR<FoundationScalarRelationFilter, FoundationWhereInput>
    adminUsers?: AdminUserListRelationFilter
    siteProfile?: XOR<SiteProfileNullableScalarRelationFilter, SiteProfileWhereInput> | null
    programs?: ProgramListRelationFilter
    galleryItems?: GalleryItemListRelationFilter
    testimonials?: TestimonialListRelationFilter
    ppdbRegistrations?: PpdbRegistrationListRelationFilter
  }

  export type SchoolOrderByWithRelationInput = {
    id?: SortOrder
    foundationId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    level?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    foundation?: FoundationOrderByWithRelationInput
    adminUsers?: AdminUserOrderByRelationAggregateInput
    siteProfile?: SiteProfileOrderByWithRelationInput
    programs?: ProgramOrderByRelationAggregateInput
    galleryItems?: GalleryItemOrderByRelationAggregateInput
    testimonials?: TestimonialOrderByRelationAggregateInput
    ppdbRegistrations?: PpdbRegistrationOrderByRelationAggregateInput
  }

  export type SchoolWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    foundationId?: StringFilter<"School"> | string
    name?: StringFilter<"School"> | string
    level?: StringFilter<"School"> | string
    address?: StringFilter<"School"> | string
    phone?: StringFilter<"School"> | string
    logoUrl?: StringNullableFilter<"School"> | string | null
    orderIndex?: IntFilter<"School"> | number
    createdAt?: DateTimeFilter<"School"> | Date | string
    updatedAt?: DateTimeFilter<"School"> | Date | string
    foundation?: XOR<FoundationScalarRelationFilter, FoundationWhereInput>
    adminUsers?: AdminUserListRelationFilter
    siteProfile?: XOR<SiteProfileNullableScalarRelationFilter, SiteProfileWhereInput> | null
    programs?: ProgramListRelationFilter
    galleryItems?: GalleryItemListRelationFilter
    testimonials?: TestimonialListRelationFilter
    ppdbRegistrations?: PpdbRegistrationListRelationFilter
  }, "id" | "code">

  export type SchoolOrderByWithAggregationInput = {
    id?: SortOrder
    foundationId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    level?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SchoolCountOrderByAggregateInput
    _avg?: SchoolAvgOrderByAggregateInput
    _max?: SchoolMaxOrderByAggregateInput
    _min?: SchoolMinOrderByAggregateInput
    _sum?: SchoolSumOrderByAggregateInput
  }

  export type SchoolScalarWhereWithAggregatesInput = {
    AND?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    OR?: SchoolScalarWhereWithAggregatesInput[]
    NOT?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"School"> | string
    foundationId?: StringWithAggregatesFilter<"School"> | string
    code?: StringWithAggregatesFilter<"School"> | string
    name?: StringWithAggregatesFilter<"School"> | string
    level?: StringWithAggregatesFilter<"School"> | string
    address?: StringWithAggregatesFilter<"School"> | string
    phone?: StringWithAggregatesFilter<"School"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"School"> | string | null
    orderIndex?: IntWithAggregatesFilter<"School"> | number
    createdAt?: DateTimeWithAggregatesFilter<"School"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"School"> | Date | string
  }

  export type AdminUserWhereInput = {
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    schoolId?: StringNullableFilter<"AdminUser"> | string | null
    username?: StringFilter<"AdminUser"> | string
    passwordHash?: StringFilter<"AdminUser"> | string
    name?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    school?: XOR<SchoolNullableScalarRelationFilter, SchoolWhereInput> | null
  }

  export type AdminUserOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrderInput | SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type AdminUserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: AdminUserWhereInput | AdminUserWhereInput[]
    OR?: AdminUserWhereInput[]
    NOT?: AdminUserWhereInput | AdminUserWhereInput[]
    schoolId?: StringNullableFilter<"AdminUser"> | string | null
    passwordHash?: StringFilter<"AdminUser"> | string
    name?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
    school?: XOR<SchoolNullableScalarRelationFilter, SchoolWhereInput> | null
  }, "id" | "username">

  export type AdminUserOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrderInput | SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminUserCountOrderByAggregateInput
    _max?: AdminUserMaxOrderByAggregateInput
    _min?: AdminUserMinOrderByAggregateInput
  }

  export type AdminUserScalarWhereWithAggregatesInput = {
    AND?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    OR?: AdminUserScalarWhereWithAggregatesInput[]
    NOT?: AdminUserScalarWhereWithAggregatesInput | AdminUserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminUser"> | string
    schoolId?: StringNullableWithAggregatesFilter<"AdminUser"> | string | null
    username?: StringWithAggregatesFilter<"AdminUser"> | string
    passwordHash?: StringWithAggregatesFilter<"AdminUser"> | string
    name?: StringWithAggregatesFilter<"AdminUser"> | string
    role?: StringWithAggregatesFilter<"AdminUser"> | string
    createdAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminUser"> | Date | string
  }

  export type SiteProfileWhereInput = {
    AND?: SiteProfileWhereInput | SiteProfileWhereInput[]
    OR?: SiteProfileWhereInput[]
    NOT?: SiteProfileWhereInput | SiteProfileWhereInput[]
    id?: StringFilter<"SiteProfile"> | string
    schoolId?: StringFilter<"SiteProfile"> | string
    heroBadge?: StringFilter<"SiteProfile"> | string
    heroTitle?: StringFilter<"SiteProfile"> | string
    heroSubtitle?: StringFilter<"SiteProfile"> | string
    heroMascotUrl?: StringFilter<"SiteProfile"> | string
    ctaTitle?: StringFilter<"SiteProfile"> | string
    ctaSubtitle?: StringFilter<"SiteProfile"> | string
    phone?: StringFilter<"SiteProfile"> | string
    instagram?: StringFilter<"SiteProfile"> | string
    facebook?: StringFilter<"SiteProfile"> | string
    address?: StringNullableFilter<"SiteProfile"> | string | null
    updatedAt?: DateTimeFilter<"SiteProfile"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }

  export type SiteProfileOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    heroMascotUrl?: SortOrder
    ctaTitle?: SortOrder
    ctaSubtitle?: SortOrder
    phone?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type SiteProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    schoolId?: string
    AND?: SiteProfileWhereInput | SiteProfileWhereInput[]
    OR?: SiteProfileWhereInput[]
    NOT?: SiteProfileWhereInput | SiteProfileWhereInput[]
    heroBadge?: StringFilter<"SiteProfile"> | string
    heroTitle?: StringFilter<"SiteProfile"> | string
    heroSubtitle?: StringFilter<"SiteProfile"> | string
    heroMascotUrl?: StringFilter<"SiteProfile"> | string
    ctaTitle?: StringFilter<"SiteProfile"> | string
    ctaSubtitle?: StringFilter<"SiteProfile"> | string
    phone?: StringFilter<"SiteProfile"> | string
    instagram?: StringFilter<"SiteProfile"> | string
    facebook?: StringFilter<"SiteProfile"> | string
    address?: StringNullableFilter<"SiteProfile"> | string | null
    updatedAt?: DateTimeFilter<"SiteProfile"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }, "id" | "schoolId">

  export type SiteProfileOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    heroMascotUrl?: SortOrder
    ctaTitle?: SortOrder
    ctaSubtitle?: SortOrder
    phone?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: SiteProfileCountOrderByAggregateInput
    _max?: SiteProfileMaxOrderByAggregateInput
    _min?: SiteProfileMinOrderByAggregateInput
  }

  export type SiteProfileScalarWhereWithAggregatesInput = {
    AND?: SiteProfileScalarWhereWithAggregatesInput | SiteProfileScalarWhereWithAggregatesInput[]
    OR?: SiteProfileScalarWhereWithAggregatesInput[]
    NOT?: SiteProfileScalarWhereWithAggregatesInput | SiteProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SiteProfile"> | string
    schoolId?: StringWithAggregatesFilter<"SiteProfile"> | string
    heroBadge?: StringWithAggregatesFilter<"SiteProfile"> | string
    heroTitle?: StringWithAggregatesFilter<"SiteProfile"> | string
    heroSubtitle?: StringWithAggregatesFilter<"SiteProfile"> | string
    heroMascotUrl?: StringWithAggregatesFilter<"SiteProfile"> | string
    ctaTitle?: StringWithAggregatesFilter<"SiteProfile"> | string
    ctaSubtitle?: StringWithAggregatesFilter<"SiteProfile"> | string
    phone?: StringWithAggregatesFilter<"SiteProfile"> | string
    instagram?: StringWithAggregatesFilter<"SiteProfile"> | string
    facebook?: StringWithAggregatesFilter<"SiteProfile"> | string
    address?: StringNullableWithAggregatesFilter<"SiteProfile"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"SiteProfile"> | Date | string
  }

  export type ProgramWhereInput = {
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    id?: StringFilter<"Program"> | string
    schoolId?: StringFilter<"Program"> | string
    title?: StringFilter<"Program"> | string
    ageRange?: StringFilter<"Program"> | string
    iconUrl?: StringFilter<"Program"> | string
    features?: StringFilter<"Program"> | string
    orderIndex?: IntFilter<"Program"> | number
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }

  export type ProgramOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    ageRange?: SortOrder
    iconUrl?: SortOrder
    features?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type ProgramWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProgramWhereInput | ProgramWhereInput[]
    OR?: ProgramWhereInput[]
    NOT?: ProgramWhereInput | ProgramWhereInput[]
    schoolId?: StringFilter<"Program"> | string
    title?: StringFilter<"Program"> | string
    ageRange?: StringFilter<"Program"> | string
    iconUrl?: StringFilter<"Program"> | string
    features?: StringFilter<"Program"> | string
    orderIndex?: IntFilter<"Program"> | number
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }, "id">

  export type ProgramOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    ageRange?: SortOrder
    iconUrl?: SortOrder
    features?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProgramCountOrderByAggregateInput
    _avg?: ProgramAvgOrderByAggregateInput
    _max?: ProgramMaxOrderByAggregateInput
    _min?: ProgramMinOrderByAggregateInput
    _sum?: ProgramSumOrderByAggregateInput
  }

  export type ProgramScalarWhereWithAggregatesInput = {
    AND?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    OR?: ProgramScalarWhereWithAggregatesInput[]
    NOT?: ProgramScalarWhereWithAggregatesInput | ProgramScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Program"> | string
    schoolId?: StringWithAggregatesFilter<"Program"> | string
    title?: StringWithAggregatesFilter<"Program"> | string
    ageRange?: StringWithAggregatesFilter<"Program"> | string
    iconUrl?: StringWithAggregatesFilter<"Program"> | string
    features?: StringWithAggregatesFilter<"Program"> | string
    orderIndex?: IntWithAggregatesFilter<"Program"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Program"> | Date | string
  }

  export type GalleryItemWhereInput = {
    AND?: GalleryItemWhereInput | GalleryItemWhereInput[]
    OR?: GalleryItemWhereInput[]
    NOT?: GalleryItemWhereInput | GalleryItemWhereInput[]
    id?: StringFilter<"GalleryItem"> | string
    schoolId?: StringFilter<"GalleryItem"> | string
    title?: StringFilter<"GalleryItem"> | string
    imageUrl?: StringFilter<"GalleryItem"> | string
    folder?: StringFilter<"GalleryItem"> | string
    orderIndex?: IntFilter<"GalleryItem"> | number
    createdAt?: DateTimeFilter<"GalleryItem"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }

  export type GalleryItemOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    folder?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type GalleryItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GalleryItemWhereInput | GalleryItemWhereInput[]
    OR?: GalleryItemWhereInput[]
    NOT?: GalleryItemWhereInput | GalleryItemWhereInput[]
    schoolId?: StringFilter<"GalleryItem"> | string
    title?: StringFilter<"GalleryItem"> | string
    imageUrl?: StringFilter<"GalleryItem"> | string
    folder?: StringFilter<"GalleryItem"> | string
    orderIndex?: IntFilter<"GalleryItem"> | number
    createdAt?: DateTimeFilter<"GalleryItem"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }, "id">

  export type GalleryItemOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    folder?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    _count?: GalleryItemCountOrderByAggregateInput
    _avg?: GalleryItemAvgOrderByAggregateInput
    _max?: GalleryItemMaxOrderByAggregateInput
    _min?: GalleryItemMinOrderByAggregateInput
    _sum?: GalleryItemSumOrderByAggregateInput
  }

  export type GalleryItemScalarWhereWithAggregatesInput = {
    AND?: GalleryItemScalarWhereWithAggregatesInput | GalleryItemScalarWhereWithAggregatesInput[]
    OR?: GalleryItemScalarWhereWithAggregatesInput[]
    NOT?: GalleryItemScalarWhereWithAggregatesInput | GalleryItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GalleryItem"> | string
    schoolId?: StringWithAggregatesFilter<"GalleryItem"> | string
    title?: StringWithAggregatesFilter<"GalleryItem"> | string
    imageUrl?: StringWithAggregatesFilter<"GalleryItem"> | string
    folder?: StringWithAggregatesFilter<"GalleryItem"> | string
    orderIndex?: IntWithAggregatesFilter<"GalleryItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GalleryItem"> | Date | string
  }

  export type TestimonialWhereInput = {
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    schoolId?: StringFilter<"Testimonial"> | string
    parentName?: StringFilter<"Testimonial"> | string
    role?: StringFilter<"Testimonial"> | string
    initials?: StringFilter<"Testimonial"> | string
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    bgColor?: StringFilter<"Testimonial"> | string
    orderIndex?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }

  export type TestimonialOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    parentName?: SortOrder
    role?: SortOrder
    initials?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    bgColor?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type TestimonialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    schoolId?: StringFilter<"Testimonial"> | string
    parentName?: StringFilter<"Testimonial"> | string
    role?: StringFilter<"Testimonial"> | string
    initials?: StringFilter<"Testimonial"> | string
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    bgColor?: StringFilter<"Testimonial"> | string
    orderIndex?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }, "id">

  export type TestimonialOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    parentName?: SortOrder
    role?: SortOrder
    initials?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    bgColor?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    _count?: TestimonialCountOrderByAggregateInput
    _avg?: TestimonialAvgOrderByAggregateInput
    _max?: TestimonialMaxOrderByAggregateInput
    _min?: TestimonialMinOrderByAggregateInput
    _sum?: TestimonialSumOrderByAggregateInput
  }

  export type TestimonialScalarWhereWithAggregatesInput = {
    AND?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    OR?: TestimonialScalarWhereWithAggregatesInput[]
    NOT?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Testimonial"> | string
    schoolId?: StringWithAggregatesFilter<"Testimonial"> | string
    parentName?: StringWithAggregatesFilter<"Testimonial"> | string
    role?: StringWithAggregatesFilter<"Testimonial"> | string
    initials?: StringWithAggregatesFilter<"Testimonial"> | string
    content?: StringWithAggregatesFilter<"Testimonial"> | string
    rating?: IntWithAggregatesFilter<"Testimonial"> | number
    bgColor?: StringWithAggregatesFilter<"Testimonial"> | string
    orderIndex?: IntWithAggregatesFilter<"Testimonial"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Testimonial"> | Date | string
  }

  export type PpdbRegistrationWhereInput = {
    AND?: PpdbRegistrationWhereInput | PpdbRegistrationWhereInput[]
    OR?: PpdbRegistrationWhereInput[]
    NOT?: PpdbRegistrationWhereInput | PpdbRegistrationWhereInput[]
    id?: StringFilter<"PpdbRegistration"> | string
    schoolId?: StringFilter<"PpdbRegistration"> | string
    registrationNo?: StringFilter<"PpdbRegistration"> | string
    namaAnak?: StringFilter<"PpdbRegistration"> | string
    jenisKelamin?: StringFilter<"PpdbRegistration"> | string
    agama?: StringFilter<"PpdbRegistration"> | string
    tempatLahir?: StringFilter<"PpdbRegistration"> | string
    tanggalLahir?: StringFilter<"PpdbRegistration"> | string
    usiaAnak?: StringFilter<"PpdbRegistration"> | string
    program?: StringFilter<"PpdbRegistration"> | string
    namaOrtu?: StringFilter<"PpdbRegistration"> | string
    noWhatsapp?: StringFilter<"PpdbRegistration"> | string
    email?: StringFilter<"PpdbRegistration"> | string
    alamatRumah?: StringFilter<"PpdbRegistration"> | string
    docKkUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docAktaUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docFotoUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docKtpUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    buktiBayarUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    paymentMethod?: StringFilter<"PpdbRegistration"> | string
    status?: StringFilter<"PpdbRegistration"> | string
    createdAt?: DateTimeFilter<"PpdbRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PpdbRegistration"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }

  export type PpdbRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    registrationNo?: SortOrder
    namaAnak?: SortOrder
    jenisKelamin?: SortOrder
    agama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    usiaAnak?: SortOrder
    program?: SortOrder
    namaOrtu?: SortOrder
    noWhatsapp?: SortOrder
    email?: SortOrder
    alamatRumah?: SortOrder
    docKkUrl?: SortOrderInput | SortOrder
    docAktaUrl?: SortOrderInput | SortOrder
    docFotoUrl?: SortOrderInput | SortOrder
    docKtpUrl?: SortOrderInput | SortOrder
    buktiBayarUrl?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    school?: SchoolOrderByWithRelationInput
  }

  export type PpdbRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    registrationNo?: string
    AND?: PpdbRegistrationWhereInput | PpdbRegistrationWhereInput[]
    OR?: PpdbRegistrationWhereInput[]
    NOT?: PpdbRegistrationWhereInput | PpdbRegistrationWhereInput[]
    schoolId?: StringFilter<"PpdbRegistration"> | string
    namaAnak?: StringFilter<"PpdbRegistration"> | string
    jenisKelamin?: StringFilter<"PpdbRegistration"> | string
    agama?: StringFilter<"PpdbRegistration"> | string
    tempatLahir?: StringFilter<"PpdbRegistration"> | string
    tanggalLahir?: StringFilter<"PpdbRegistration"> | string
    usiaAnak?: StringFilter<"PpdbRegistration"> | string
    program?: StringFilter<"PpdbRegistration"> | string
    namaOrtu?: StringFilter<"PpdbRegistration"> | string
    noWhatsapp?: StringFilter<"PpdbRegistration"> | string
    email?: StringFilter<"PpdbRegistration"> | string
    alamatRumah?: StringFilter<"PpdbRegistration"> | string
    docKkUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docAktaUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docFotoUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docKtpUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    buktiBayarUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    paymentMethod?: StringFilter<"PpdbRegistration"> | string
    status?: StringFilter<"PpdbRegistration"> | string
    createdAt?: DateTimeFilter<"PpdbRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PpdbRegistration"> | Date | string
    school?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
  }, "id" | "registrationNo">

  export type PpdbRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    schoolId?: SortOrder
    registrationNo?: SortOrder
    namaAnak?: SortOrder
    jenisKelamin?: SortOrder
    agama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    usiaAnak?: SortOrder
    program?: SortOrder
    namaOrtu?: SortOrder
    noWhatsapp?: SortOrder
    email?: SortOrder
    alamatRumah?: SortOrder
    docKkUrl?: SortOrderInput | SortOrder
    docAktaUrl?: SortOrderInput | SortOrder
    docFotoUrl?: SortOrderInput | SortOrder
    docKtpUrl?: SortOrderInput | SortOrder
    buktiBayarUrl?: SortOrderInput | SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PpdbRegistrationCountOrderByAggregateInput
    _max?: PpdbRegistrationMaxOrderByAggregateInput
    _min?: PpdbRegistrationMinOrderByAggregateInput
  }

  export type PpdbRegistrationScalarWhereWithAggregatesInput = {
    AND?: PpdbRegistrationScalarWhereWithAggregatesInput | PpdbRegistrationScalarWhereWithAggregatesInput[]
    OR?: PpdbRegistrationScalarWhereWithAggregatesInput[]
    NOT?: PpdbRegistrationScalarWhereWithAggregatesInput | PpdbRegistrationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    schoolId?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    registrationNo?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    namaAnak?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    jenisKelamin?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    agama?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    tempatLahir?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    tanggalLahir?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    usiaAnak?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    program?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    namaOrtu?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    noWhatsapp?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    email?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    alamatRumah?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    docKkUrl?: StringNullableWithAggregatesFilter<"PpdbRegistration"> | string | null
    docAktaUrl?: StringNullableWithAggregatesFilter<"PpdbRegistration"> | string | null
    docFotoUrl?: StringNullableWithAggregatesFilter<"PpdbRegistration"> | string | null
    docKtpUrl?: StringNullableWithAggregatesFilter<"PpdbRegistration"> | string | null
    buktiBayarUrl?: StringNullableWithAggregatesFilter<"PpdbRegistration"> | string | null
    paymentMethod?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    status?: StringWithAggregatesFilter<"PpdbRegistration"> | string
    createdAt?: DateTimeWithAggregatesFilter<"PpdbRegistration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PpdbRegistration"> | Date | string
  }

  export type UploadLogWhereInput = {
    AND?: UploadLogWhereInput | UploadLogWhereInput[]
    OR?: UploadLogWhereInput[]
    NOT?: UploadLogWhereInput | UploadLogWhereInput[]
    id?: StringFilter<"UploadLog"> | string
    fileName?: StringFilter<"UploadLog"> | string
    fileFolder?: StringFilter<"UploadLog"> | string
    fileUrl?: StringFilter<"UploadLog"> | string
    fileSize?: IntNullableFilter<"UploadLog"> | number | null
    mimeType?: StringNullableFilter<"UploadLog"> | string | null
    createdAt?: DateTimeFilter<"UploadLog"> | Date | string
  }

  export type UploadLogOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileFolder?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type UploadLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UploadLogWhereInput | UploadLogWhereInput[]
    OR?: UploadLogWhereInput[]
    NOT?: UploadLogWhereInput | UploadLogWhereInput[]
    fileName?: StringFilter<"UploadLog"> | string
    fileFolder?: StringFilter<"UploadLog"> | string
    fileUrl?: StringFilter<"UploadLog"> | string
    fileSize?: IntNullableFilter<"UploadLog"> | number | null
    mimeType?: StringNullableFilter<"UploadLog"> | string | null
    createdAt?: DateTimeFilter<"UploadLog"> | Date | string
  }, "id">

  export type UploadLogOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileFolder?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UploadLogCountOrderByAggregateInput
    _avg?: UploadLogAvgOrderByAggregateInput
    _max?: UploadLogMaxOrderByAggregateInput
    _min?: UploadLogMinOrderByAggregateInput
    _sum?: UploadLogSumOrderByAggregateInput
  }

  export type UploadLogScalarWhereWithAggregatesInput = {
    AND?: UploadLogScalarWhereWithAggregatesInput | UploadLogScalarWhereWithAggregatesInput[]
    OR?: UploadLogScalarWhereWithAggregatesInput[]
    NOT?: UploadLogScalarWhereWithAggregatesInput | UploadLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UploadLog"> | string
    fileName?: StringWithAggregatesFilter<"UploadLog"> | string
    fileFolder?: StringWithAggregatesFilter<"UploadLog"> | string
    fileUrl?: StringWithAggregatesFilter<"UploadLog"> | string
    fileSize?: IntNullableWithAggregatesFilter<"UploadLog"> | number | null
    mimeType?: StringNullableWithAggregatesFilter<"UploadLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UploadLog"> | Date | string
  }

  export type FoundationCreateInput = {
    id?: string
    name?: string
    tagline?: string
    logoUrl?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schools?: SchoolCreateNestedManyWithoutFoundationInput
  }

  export type FoundationUncheckedCreateInput = {
    id?: string
    name?: string
    tagline?: string
    logoUrl?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    schools?: SchoolUncheckedCreateNestedManyWithoutFoundationInput
  }

  export type FoundationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schools?: SchoolUpdateManyWithoutFoundationNestedInput
  }

  export type FoundationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    schools?: SchoolUncheckedUpdateManyWithoutFoundationNestedInput
  }

  export type FoundationCreateManyInput = {
    id?: string
    name?: string
    tagline?: string
    logoUrl?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoundationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoundationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolCreateInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateManyInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SchoolUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school?: SchoolCreateNestedOneWithoutAdminUsersInput
  }

  export type AdminUserUncheckedCreateInput = {
    id?: string
    schoolId?: string | null
    username: string
    passwordHash: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneWithoutAdminUsersNestedInput
  }

  export type AdminUserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateManyInput = {
    id?: string
    schoolId?: string | null
    username: string
    passwordHash: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteProfileCreateInput = {
    id?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroMascotUrl?: string
    ctaTitle?: string
    ctaSubtitle?: string
    phone?: string
    instagram?: string
    facebook?: string
    address?: string | null
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutSiteProfileInput
  }

  export type SiteProfileUncheckedCreateInput = {
    id?: string
    schoolId: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroMascotUrl?: string
    ctaTitle?: string
    ctaSubtitle?: string
    phone?: string
    instagram?: string
    facebook?: string
    address?: string | null
    updatedAt?: Date | string
  }

  export type SiteProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    heroMascotUrl?: StringFieldUpdateOperationsInput | string
    ctaTitle?: StringFieldUpdateOperationsInput | string
    ctaSubtitle?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutSiteProfileNestedInput
  }

  export type SiteProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    heroMascotUrl?: StringFieldUpdateOperationsInput | string
    ctaTitle?: StringFieldUpdateOperationsInput | string
    ctaSubtitle?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteProfileCreateManyInput = {
    id?: string
    schoolId: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroMascotUrl?: string
    ctaTitle?: string
    ctaSubtitle?: string
    phone?: string
    instagram?: string
    facebook?: string
    address?: string | null
    updatedAt?: Date | string
  }

  export type SiteProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    heroMascotUrl?: StringFieldUpdateOperationsInput | string
    ctaTitle?: StringFieldUpdateOperationsInput | string
    ctaSubtitle?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    heroMascotUrl?: StringFieldUpdateOperationsInput | string
    ctaTitle?: StringFieldUpdateOperationsInput | string
    ctaSubtitle?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramCreateInput = {
    id?: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutProgramsInput
  }

  export type ProgramUncheckedCreateInput = {
    id?: string
    schoolId: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutProgramsNestedInput
  }

  export type ProgramUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramCreateManyInput = {
    id?: string
    schoolId: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemCreateInput = {
    id?: string
    title: string
    imageUrl: string
    folder?: string
    orderIndex?: number
    createdAt?: Date | string
    school: SchoolCreateNestedOneWithoutGalleryItemsInput
  }

  export type GalleryItemUncheckedCreateInput = {
    id?: string
    schoolId: string
    title: string
    imageUrl: string
    folder?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type GalleryItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutGalleryItemsNestedInput
  }

  export type GalleryItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemCreateManyInput = {
    id?: string
    schoolId: string
    title: string
    imageUrl: string
    folder?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type GalleryItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateInput = {
    id?: string
    parentName: string
    role?: string
    initials: string
    content: string
    rating?: number
    bgColor?: string
    orderIndex?: number
    createdAt?: Date | string
    school: SchoolCreateNestedOneWithoutTestimonialsInput
  }

  export type TestimonialUncheckedCreateInput = {
    id?: string
    schoolId: string
    parentName: string
    role?: string
    initials: string
    content: string
    rating?: number
    bgColor?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type TestimonialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutTestimonialsNestedInput
  }

  export type TestimonialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateManyInput = {
    id?: string
    schoolId: string
    parentName: string
    role?: string
    initials: string
    content: string
    rating?: number
    bgColor?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type TestimonialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PpdbRegistrationCreateInput = {
    id?: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl?: string | null
    docAktaUrl?: string | null
    docFotoUrl?: string | null
    docKtpUrl?: string | null
    buktiBayarUrl?: string | null
    paymentMethod?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    school: SchoolCreateNestedOneWithoutPpdbRegistrationsInput
  }

  export type PpdbRegistrationUncheckedCreateInput = {
    id?: string
    schoolId: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl?: string | null
    docAktaUrl?: string | null
    docFotoUrl?: string | null
    docKtpUrl?: string | null
    buktiBayarUrl?: string | null
    paymentMethod?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PpdbRegistrationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    school?: SchoolUpdateOneRequiredWithoutPpdbRegistrationsNestedInput
  }

  export type PpdbRegistrationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PpdbRegistrationCreateManyInput = {
    id?: string
    schoolId: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl?: string | null
    docAktaUrl?: string | null
    docFotoUrl?: string | null
    docKtpUrl?: string | null
    buktiBayarUrl?: string | null
    paymentMethod?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PpdbRegistrationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PpdbRegistrationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    schoolId?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadLogCreateInput = {
    id?: string
    fileName: string
    fileFolder: string
    fileUrl: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type UploadLogUncheckedCreateInput = {
    id?: string
    fileName: string
    fileFolder: string
    fileUrl: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type UploadLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileFolder?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileFolder?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadLogCreateManyInput = {
    id?: string
    fileName: string
    fileFolder: string
    fileUrl: string
    fileSize?: number | null
    mimeType?: string | null
    createdAt?: Date | string
  }

  export type UploadLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileFolder?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileFolder?: StringFieldUpdateOperationsInput | string
    fileUrl?: StringFieldUpdateOperationsInput | string
    fileSize?: NullableIntFieldUpdateOperationsInput | number | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type SchoolListRelationFilter = {
    every?: SchoolWhereInput
    some?: SchoolWhereInput
    none?: SchoolWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SchoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FoundationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    logoUrl?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoundationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    logoUrl?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FoundationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tagline?: SortOrder
    logoUrl?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type FoundationScalarRelationFilter = {
    is?: FoundationWhereInput
    isNot?: FoundationWhereInput
  }

  export type AdminUserListRelationFilter = {
    every?: AdminUserWhereInput
    some?: AdminUserWhereInput
    none?: AdminUserWhereInput
  }

  export type SiteProfileNullableScalarRelationFilter = {
    is?: SiteProfileWhereInput | null
    isNot?: SiteProfileWhereInput | null
  }

  export type ProgramListRelationFilter = {
    every?: ProgramWhereInput
    some?: ProgramWhereInput
    none?: ProgramWhereInput
  }

  export type GalleryItemListRelationFilter = {
    every?: GalleryItemWhereInput
    some?: GalleryItemWhereInput
    none?: GalleryItemWhereInput
  }

  export type TestimonialListRelationFilter = {
    every?: TestimonialWhereInput
    some?: TestimonialWhereInput
    none?: TestimonialWhereInput
  }

  export type PpdbRegistrationListRelationFilter = {
    every?: PpdbRegistrationWhereInput
    some?: PpdbRegistrationWhereInput
    none?: PpdbRegistrationWhereInput
  }

  export type AdminUserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProgramOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GalleryItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TestimonialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PpdbRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchoolCountOrderByAggregateInput = {
    id?: SortOrder
    foundationId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    level?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    logoUrl?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type SchoolMaxOrderByAggregateInput = {
    id?: SortOrder
    foundationId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    level?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    logoUrl?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolMinOrderByAggregateInput = {
    id?: SortOrder
    foundationId?: SortOrder
    code?: SortOrder
    name?: SortOrder
    level?: SortOrder
    address?: SortOrder
    phone?: SortOrder
    logoUrl?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SchoolNullableScalarRelationFilter = {
    is?: SchoolWhereInput | null
    isNot?: SchoolWhereInput | null
  }

  export type AdminUserCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminUserMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SchoolScalarRelationFilter = {
    is?: SchoolWhereInput
    isNot?: SchoolWhereInput
  }

  export type SiteProfileCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    heroMascotUrl?: SortOrder
    ctaTitle?: SortOrder
    ctaSubtitle?: SortOrder
    phone?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    heroMascotUrl?: SortOrder
    ctaTitle?: SortOrder
    ctaSubtitle?: SortOrder
    phone?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteProfileMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    heroBadge?: SortOrder
    heroTitle?: SortOrder
    heroSubtitle?: SortOrder
    heroMascotUrl?: SortOrder
    ctaTitle?: SortOrder
    ctaSubtitle?: SortOrder
    phone?: SortOrder
    instagram?: SortOrder
    facebook?: SortOrder
    address?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    ageRange?: SortOrder
    iconUrl?: SortOrder
    features?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type ProgramMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    ageRange?: SortOrder
    iconUrl?: SortOrder
    features?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    ageRange?: SortOrder
    iconUrl?: SortOrder
    features?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProgramSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type GalleryItemCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    folder?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type GalleryItemAvgOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type GalleryItemMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    folder?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type GalleryItemMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    folder?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type GalleryItemSumOrderByAggregateInput = {
    orderIndex?: SortOrder
  }

  export type TestimonialCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    parentName?: SortOrder
    role?: SortOrder
    initials?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    bgColor?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type TestimonialAvgOrderByAggregateInput = {
    rating?: SortOrder
    orderIndex?: SortOrder
  }

  export type TestimonialMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    parentName?: SortOrder
    role?: SortOrder
    initials?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    bgColor?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type TestimonialMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    parentName?: SortOrder
    role?: SortOrder
    initials?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    bgColor?: SortOrder
    orderIndex?: SortOrder
    createdAt?: SortOrder
  }

  export type TestimonialSumOrderByAggregateInput = {
    rating?: SortOrder
    orderIndex?: SortOrder
  }

  export type PpdbRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    registrationNo?: SortOrder
    namaAnak?: SortOrder
    jenisKelamin?: SortOrder
    agama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    usiaAnak?: SortOrder
    program?: SortOrder
    namaOrtu?: SortOrder
    noWhatsapp?: SortOrder
    email?: SortOrder
    alamatRumah?: SortOrder
    docKkUrl?: SortOrder
    docAktaUrl?: SortOrder
    docFotoUrl?: SortOrder
    docKtpUrl?: SortOrder
    buktiBayarUrl?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PpdbRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    registrationNo?: SortOrder
    namaAnak?: SortOrder
    jenisKelamin?: SortOrder
    agama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    usiaAnak?: SortOrder
    program?: SortOrder
    namaOrtu?: SortOrder
    noWhatsapp?: SortOrder
    email?: SortOrder
    alamatRumah?: SortOrder
    docKkUrl?: SortOrder
    docAktaUrl?: SortOrder
    docFotoUrl?: SortOrder
    docKtpUrl?: SortOrder
    buktiBayarUrl?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PpdbRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    schoolId?: SortOrder
    registrationNo?: SortOrder
    namaAnak?: SortOrder
    jenisKelamin?: SortOrder
    agama?: SortOrder
    tempatLahir?: SortOrder
    tanggalLahir?: SortOrder
    usiaAnak?: SortOrder
    program?: SortOrder
    namaOrtu?: SortOrder
    noWhatsapp?: SortOrder
    email?: SortOrder
    alamatRumah?: SortOrder
    docKkUrl?: SortOrder
    docAktaUrl?: SortOrder
    docFotoUrl?: SortOrder
    docKtpUrl?: SortOrder
    buktiBayarUrl?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UploadLogCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileFolder?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadLogAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type UploadLogMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileFolder?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadLogMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    fileFolder?: SortOrder
    fileUrl?: SortOrder
    fileSize?: SortOrder
    mimeType?: SortOrder
    createdAt?: SortOrder
  }

  export type UploadLogSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SchoolCreateNestedManyWithoutFoundationInput = {
    create?: XOR<SchoolCreateWithoutFoundationInput, SchoolUncheckedCreateWithoutFoundationInput> | SchoolCreateWithoutFoundationInput[] | SchoolUncheckedCreateWithoutFoundationInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutFoundationInput | SchoolCreateOrConnectWithoutFoundationInput[]
    createMany?: SchoolCreateManyFoundationInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutFoundationInput = {
    create?: XOR<SchoolCreateWithoutFoundationInput, SchoolUncheckedCreateWithoutFoundationInput> | SchoolCreateWithoutFoundationInput[] | SchoolUncheckedCreateWithoutFoundationInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutFoundationInput | SchoolCreateOrConnectWithoutFoundationInput[]
    createMany?: SchoolCreateManyFoundationInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SchoolUpdateManyWithoutFoundationNestedInput = {
    create?: XOR<SchoolCreateWithoutFoundationInput, SchoolUncheckedCreateWithoutFoundationInput> | SchoolCreateWithoutFoundationInput[] | SchoolUncheckedCreateWithoutFoundationInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutFoundationInput | SchoolCreateOrConnectWithoutFoundationInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutFoundationInput | SchoolUpsertWithWhereUniqueWithoutFoundationInput[]
    createMany?: SchoolCreateManyFoundationInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutFoundationInput | SchoolUpdateWithWhereUniqueWithoutFoundationInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutFoundationInput | SchoolUpdateManyWithWhereWithoutFoundationInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutFoundationNestedInput = {
    create?: XOR<SchoolCreateWithoutFoundationInput, SchoolUncheckedCreateWithoutFoundationInput> | SchoolCreateWithoutFoundationInput[] | SchoolUncheckedCreateWithoutFoundationInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutFoundationInput | SchoolCreateOrConnectWithoutFoundationInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutFoundationInput | SchoolUpsertWithWhereUniqueWithoutFoundationInput[]
    createMany?: SchoolCreateManyFoundationInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutFoundationInput | SchoolUpdateWithWhereUniqueWithoutFoundationInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutFoundationInput | SchoolUpdateManyWithWhereWithoutFoundationInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type FoundationCreateNestedOneWithoutSchoolsInput = {
    create?: XOR<FoundationCreateWithoutSchoolsInput, FoundationUncheckedCreateWithoutSchoolsInput>
    connectOrCreate?: FoundationCreateOrConnectWithoutSchoolsInput
    connect?: FoundationWhereUniqueInput
  }

  export type AdminUserCreateNestedManyWithoutSchoolInput = {
    create?: XOR<AdminUserCreateWithoutSchoolInput, AdminUserUncheckedCreateWithoutSchoolInput> | AdminUserCreateWithoutSchoolInput[] | AdminUserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutSchoolInput | AdminUserCreateOrConnectWithoutSchoolInput[]
    createMany?: AdminUserCreateManySchoolInputEnvelope
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
  }

  export type SiteProfileCreateNestedOneWithoutSchoolInput = {
    create?: XOR<SiteProfileCreateWithoutSchoolInput, SiteProfileUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SiteProfileCreateOrConnectWithoutSchoolInput
    connect?: SiteProfileWhereUniqueInput
  }

  export type ProgramCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ProgramCreateWithoutSchoolInput, ProgramUncheckedCreateWithoutSchoolInput> | ProgramCreateWithoutSchoolInput[] | ProgramUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutSchoolInput | ProgramCreateOrConnectWithoutSchoolInput[]
    createMany?: ProgramCreateManySchoolInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type GalleryItemCreateNestedManyWithoutSchoolInput = {
    create?: XOR<GalleryItemCreateWithoutSchoolInput, GalleryItemUncheckedCreateWithoutSchoolInput> | GalleryItemCreateWithoutSchoolInput[] | GalleryItemUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: GalleryItemCreateOrConnectWithoutSchoolInput | GalleryItemCreateOrConnectWithoutSchoolInput[]
    createMany?: GalleryItemCreateManySchoolInputEnvelope
    connect?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
  }

  export type TestimonialCreateNestedManyWithoutSchoolInput = {
    create?: XOR<TestimonialCreateWithoutSchoolInput, TestimonialUncheckedCreateWithoutSchoolInput> | TestimonialCreateWithoutSchoolInput[] | TestimonialUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutSchoolInput | TestimonialCreateOrConnectWithoutSchoolInput[]
    createMany?: TestimonialCreateManySchoolInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type PpdbRegistrationCreateNestedManyWithoutSchoolInput = {
    create?: XOR<PpdbRegistrationCreateWithoutSchoolInput, PpdbRegistrationUncheckedCreateWithoutSchoolInput> | PpdbRegistrationCreateWithoutSchoolInput[] | PpdbRegistrationUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: PpdbRegistrationCreateOrConnectWithoutSchoolInput | PpdbRegistrationCreateOrConnectWithoutSchoolInput[]
    createMany?: PpdbRegistrationCreateManySchoolInputEnvelope
    connect?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
  }

  export type AdminUserUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<AdminUserCreateWithoutSchoolInput, AdminUserUncheckedCreateWithoutSchoolInput> | AdminUserCreateWithoutSchoolInput[] | AdminUserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutSchoolInput | AdminUserCreateOrConnectWithoutSchoolInput[]
    createMany?: AdminUserCreateManySchoolInputEnvelope
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
  }

  export type SiteProfileUncheckedCreateNestedOneWithoutSchoolInput = {
    create?: XOR<SiteProfileCreateWithoutSchoolInput, SiteProfileUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SiteProfileCreateOrConnectWithoutSchoolInput
    connect?: SiteProfileWhereUniqueInput
  }

  export type ProgramUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ProgramCreateWithoutSchoolInput, ProgramUncheckedCreateWithoutSchoolInput> | ProgramCreateWithoutSchoolInput[] | ProgramUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutSchoolInput | ProgramCreateOrConnectWithoutSchoolInput[]
    createMany?: ProgramCreateManySchoolInputEnvelope
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
  }

  export type GalleryItemUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<GalleryItemCreateWithoutSchoolInput, GalleryItemUncheckedCreateWithoutSchoolInput> | GalleryItemCreateWithoutSchoolInput[] | GalleryItemUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: GalleryItemCreateOrConnectWithoutSchoolInput | GalleryItemCreateOrConnectWithoutSchoolInput[]
    createMany?: GalleryItemCreateManySchoolInputEnvelope
    connect?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
  }

  export type TestimonialUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<TestimonialCreateWithoutSchoolInput, TestimonialUncheckedCreateWithoutSchoolInput> | TestimonialCreateWithoutSchoolInput[] | TestimonialUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutSchoolInput | TestimonialCreateOrConnectWithoutSchoolInput[]
    createMany?: TestimonialCreateManySchoolInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<PpdbRegistrationCreateWithoutSchoolInput, PpdbRegistrationUncheckedCreateWithoutSchoolInput> | PpdbRegistrationCreateWithoutSchoolInput[] | PpdbRegistrationUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: PpdbRegistrationCreateOrConnectWithoutSchoolInput | PpdbRegistrationCreateOrConnectWithoutSchoolInput[]
    createMany?: PpdbRegistrationCreateManySchoolInputEnvelope
    connect?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FoundationUpdateOneRequiredWithoutSchoolsNestedInput = {
    create?: XOR<FoundationCreateWithoutSchoolsInput, FoundationUncheckedCreateWithoutSchoolsInput>
    connectOrCreate?: FoundationCreateOrConnectWithoutSchoolsInput
    upsert?: FoundationUpsertWithoutSchoolsInput
    connect?: FoundationWhereUniqueInput
    update?: XOR<XOR<FoundationUpdateToOneWithWhereWithoutSchoolsInput, FoundationUpdateWithoutSchoolsInput>, FoundationUncheckedUpdateWithoutSchoolsInput>
  }

  export type AdminUserUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<AdminUserCreateWithoutSchoolInput, AdminUserUncheckedCreateWithoutSchoolInput> | AdminUserCreateWithoutSchoolInput[] | AdminUserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutSchoolInput | AdminUserCreateOrConnectWithoutSchoolInput[]
    upsert?: AdminUserUpsertWithWhereUniqueWithoutSchoolInput | AdminUserUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: AdminUserCreateManySchoolInputEnvelope
    set?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    disconnect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    delete?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    update?: AdminUserUpdateWithWhereUniqueWithoutSchoolInput | AdminUserUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: AdminUserUpdateManyWithWhereWithoutSchoolInput | AdminUserUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
  }

  export type SiteProfileUpdateOneWithoutSchoolNestedInput = {
    create?: XOR<SiteProfileCreateWithoutSchoolInput, SiteProfileUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SiteProfileCreateOrConnectWithoutSchoolInput
    upsert?: SiteProfileUpsertWithoutSchoolInput
    disconnect?: SiteProfileWhereInput | boolean
    delete?: SiteProfileWhereInput | boolean
    connect?: SiteProfileWhereUniqueInput
    update?: XOR<XOR<SiteProfileUpdateToOneWithWhereWithoutSchoolInput, SiteProfileUpdateWithoutSchoolInput>, SiteProfileUncheckedUpdateWithoutSchoolInput>
  }

  export type ProgramUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ProgramCreateWithoutSchoolInput, ProgramUncheckedCreateWithoutSchoolInput> | ProgramCreateWithoutSchoolInput[] | ProgramUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutSchoolInput | ProgramCreateOrConnectWithoutSchoolInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutSchoolInput | ProgramUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ProgramCreateManySchoolInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutSchoolInput | ProgramUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutSchoolInput | ProgramUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type GalleryItemUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<GalleryItemCreateWithoutSchoolInput, GalleryItemUncheckedCreateWithoutSchoolInput> | GalleryItemCreateWithoutSchoolInput[] | GalleryItemUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: GalleryItemCreateOrConnectWithoutSchoolInput | GalleryItemCreateOrConnectWithoutSchoolInput[]
    upsert?: GalleryItemUpsertWithWhereUniqueWithoutSchoolInput | GalleryItemUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: GalleryItemCreateManySchoolInputEnvelope
    set?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    disconnect?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    delete?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    connect?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    update?: GalleryItemUpdateWithWhereUniqueWithoutSchoolInput | GalleryItemUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: GalleryItemUpdateManyWithWhereWithoutSchoolInput | GalleryItemUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: GalleryItemScalarWhereInput | GalleryItemScalarWhereInput[]
  }

  export type TestimonialUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<TestimonialCreateWithoutSchoolInput, TestimonialUncheckedCreateWithoutSchoolInput> | TestimonialCreateWithoutSchoolInput[] | TestimonialUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutSchoolInput | TestimonialCreateOrConnectWithoutSchoolInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutSchoolInput | TestimonialUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: TestimonialCreateManySchoolInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutSchoolInput | TestimonialUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutSchoolInput | TestimonialUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type PpdbRegistrationUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<PpdbRegistrationCreateWithoutSchoolInput, PpdbRegistrationUncheckedCreateWithoutSchoolInput> | PpdbRegistrationCreateWithoutSchoolInput[] | PpdbRegistrationUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: PpdbRegistrationCreateOrConnectWithoutSchoolInput | PpdbRegistrationCreateOrConnectWithoutSchoolInput[]
    upsert?: PpdbRegistrationUpsertWithWhereUniqueWithoutSchoolInput | PpdbRegistrationUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: PpdbRegistrationCreateManySchoolInputEnvelope
    set?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    disconnect?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    delete?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    connect?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    update?: PpdbRegistrationUpdateWithWhereUniqueWithoutSchoolInput | PpdbRegistrationUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: PpdbRegistrationUpdateManyWithWhereWithoutSchoolInput | PpdbRegistrationUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: PpdbRegistrationScalarWhereInput | PpdbRegistrationScalarWhereInput[]
  }

  export type AdminUserUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<AdminUserCreateWithoutSchoolInput, AdminUserUncheckedCreateWithoutSchoolInput> | AdminUserCreateWithoutSchoolInput[] | AdminUserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: AdminUserCreateOrConnectWithoutSchoolInput | AdminUserCreateOrConnectWithoutSchoolInput[]
    upsert?: AdminUserUpsertWithWhereUniqueWithoutSchoolInput | AdminUserUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: AdminUserCreateManySchoolInputEnvelope
    set?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    disconnect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    delete?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    connect?: AdminUserWhereUniqueInput | AdminUserWhereUniqueInput[]
    update?: AdminUserUpdateWithWhereUniqueWithoutSchoolInput | AdminUserUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: AdminUserUpdateManyWithWhereWithoutSchoolInput | AdminUserUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
  }

  export type SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput = {
    create?: XOR<SiteProfileCreateWithoutSchoolInput, SiteProfileUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: SiteProfileCreateOrConnectWithoutSchoolInput
    upsert?: SiteProfileUpsertWithoutSchoolInput
    disconnect?: SiteProfileWhereInput | boolean
    delete?: SiteProfileWhereInput | boolean
    connect?: SiteProfileWhereUniqueInput
    update?: XOR<XOR<SiteProfileUpdateToOneWithWhereWithoutSchoolInput, SiteProfileUpdateWithoutSchoolInput>, SiteProfileUncheckedUpdateWithoutSchoolInput>
  }

  export type ProgramUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ProgramCreateWithoutSchoolInput, ProgramUncheckedCreateWithoutSchoolInput> | ProgramCreateWithoutSchoolInput[] | ProgramUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ProgramCreateOrConnectWithoutSchoolInput | ProgramCreateOrConnectWithoutSchoolInput[]
    upsert?: ProgramUpsertWithWhereUniqueWithoutSchoolInput | ProgramUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ProgramCreateManySchoolInputEnvelope
    set?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    disconnect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    delete?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    connect?: ProgramWhereUniqueInput | ProgramWhereUniqueInput[]
    update?: ProgramUpdateWithWhereUniqueWithoutSchoolInput | ProgramUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ProgramUpdateManyWithWhereWithoutSchoolInput | ProgramUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
  }

  export type GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<GalleryItemCreateWithoutSchoolInput, GalleryItemUncheckedCreateWithoutSchoolInput> | GalleryItemCreateWithoutSchoolInput[] | GalleryItemUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: GalleryItemCreateOrConnectWithoutSchoolInput | GalleryItemCreateOrConnectWithoutSchoolInput[]
    upsert?: GalleryItemUpsertWithWhereUniqueWithoutSchoolInput | GalleryItemUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: GalleryItemCreateManySchoolInputEnvelope
    set?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    disconnect?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    delete?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    connect?: GalleryItemWhereUniqueInput | GalleryItemWhereUniqueInput[]
    update?: GalleryItemUpdateWithWhereUniqueWithoutSchoolInput | GalleryItemUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: GalleryItemUpdateManyWithWhereWithoutSchoolInput | GalleryItemUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: GalleryItemScalarWhereInput | GalleryItemScalarWhereInput[]
  }

  export type TestimonialUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<TestimonialCreateWithoutSchoolInput, TestimonialUncheckedCreateWithoutSchoolInput> | TestimonialCreateWithoutSchoolInput[] | TestimonialUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutSchoolInput | TestimonialCreateOrConnectWithoutSchoolInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutSchoolInput | TestimonialUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: TestimonialCreateManySchoolInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutSchoolInput | TestimonialUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutSchoolInput | TestimonialUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<PpdbRegistrationCreateWithoutSchoolInput, PpdbRegistrationUncheckedCreateWithoutSchoolInput> | PpdbRegistrationCreateWithoutSchoolInput[] | PpdbRegistrationUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: PpdbRegistrationCreateOrConnectWithoutSchoolInput | PpdbRegistrationCreateOrConnectWithoutSchoolInput[]
    upsert?: PpdbRegistrationUpsertWithWhereUniqueWithoutSchoolInput | PpdbRegistrationUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: PpdbRegistrationCreateManySchoolInputEnvelope
    set?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    disconnect?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    delete?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    connect?: PpdbRegistrationWhereUniqueInput | PpdbRegistrationWhereUniqueInput[]
    update?: PpdbRegistrationUpdateWithWhereUniqueWithoutSchoolInput | PpdbRegistrationUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: PpdbRegistrationUpdateManyWithWhereWithoutSchoolInput | PpdbRegistrationUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: PpdbRegistrationScalarWhereInput | PpdbRegistrationScalarWhereInput[]
  }

  export type SchoolCreateNestedOneWithoutAdminUsersInput = {
    create?: XOR<SchoolCreateWithoutAdminUsersInput, SchoolUncheckedCreateWithoutAdminUsersInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutAdminUsersInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneWithoutAdminUsersNestedInput = {
    create?: XOR<SchoolCreateWithoutAdminUsersInput, SchoolUncheckedCreateWithoutAdminUsersInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutAdminUsersInput
    upsert?: SchoolUpsertWithoutAdminUsersInput
    disconnect?: SchoolWhereInput | boolean
    delete?: SchoolWhereInput | boolean
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutAdminUsersInput, SchoolUpdateWithoutAdminUsersInput>, SchoolUncheckedUpdateWithoutAdminUsersInput>
  }

  export type SchoolCreateNestedOneWithoutSiteProfileInput = {
    create?: XOR<SchoolCreateWithoutSiteProfileInput, SchoolUncheckedCreateWithoutSiteProfileInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutSiteProfileInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutSiteProfileNestedInput = {
    create?: XOR<SchoolCreateWithoutSiteProfileInput, SchoolUncheckedCreateWithoutSiteProfileInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutSiteProfileInput
    upsert?: SchoolUpsertWithoutSiteProfileInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutSiteProfileInput, SchoolUpdateWithoutSiteProfileInput>, SchoolUncheckedUpdateWithoutSiteProfileInput>
  }

  export type SchoolCreateNestedOneWithoutProgramsInput = {
    create?: XOR<SchoolCreateWithoutProgramsInput, SchoolUncheckedCreateWithoutProgramsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutProgramsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutProgramsNestedInput = {
    create?: XOR<SchoolCreateWithoutProgramsInput, SchoolUncheckedCreateWithoutProgramsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutProgramsInput
    upsert?: SchoolUpsertWithoutProgramsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutProgramsInput, SchoolUpdateWithoutProgramsInput>, SchoolUncheckedUpdateWithoutProgramsInput>
  }

  export type SchoolCreateNestedOneWithoutGalleryItemsInput = {
    create?: XOR<SchoolCreateWithoutGalleryItemsInput, SchoolUncheckedCreateWithoutGalleryItemsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutGalleryItemsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutGalleryItemsNestedInput = {
    create?: XOR<SchoolCreateWithoutGalleryItemsInput, SchoolUncheckedCreateWithoutGalleryItemsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutGalleryItemsInput
    upsert?: SchoolUpsertWithoutGalleryItemsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutGalleryItemsInput, SchoolUpdateWithoutGalleryItemsInput>, SchoolUncheckedUpdateWithoutGalleryItemsInput>
  }

  export type SchoolCreateNestedOneWithoutTestimonialsInput = {
    create?: XOR<SchoolCreateWithoutTestimonialsInput, SchoolUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutTestimonialsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutTestimonialsNestedInput = {
    create?: XOR<SchoolCreateWithoutTestimonialsInput, SchoolUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutTestimonialsInput
    upsert?: SchoolUpsertWithoutTestimonialsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutTestimonialsInput, SchoolUpdateWithoutTestimonialsInput>, SchoolUncheckedUpdateWithoutTestimonialsInput>
  }

  export type SchoolCreateNestedOneWithoutPpdbRegistrationsInput = {
    create?: XOR<SchoolCreateWithoutPpdbRegistrationsInput, SchoolUncheckedCreateWithoutPpdbRegistrationsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutPpdbRegistrationsInput
    connect?: SchoolWhereUniqueInput
  }

  export type SchoolUpdateOneRequiredWithoutPpdbRegistrationsNestedInput = {
    create?: XOR<SchoolCreateWithoutPpdbRegistrationsInput, SchoolUncheckedCreateWithoutPpdbRegistrationsInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutPpdbRegistrationsInput
    upsert?: SchoolUpsertWithoutPpdbRegistrationsInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutPpdbRegistrationsInput, SchoolUpdateWithoutPpdbRegistrationsInput>, SchoolUncheckedUpdateWithoutPpdbRegistrationsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type SchoolCreateWithoutFoundationInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutFoundationInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutFoundationInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutFoundationInput, SchoolUncheckedCreateWithoutFoundationInput>
  }

  export type SchoolCreateManyFoundationInputEnvelope = {
    data: SchoolCreateManyFoundationInput | SchoolCreateManyFoundationInput[]
    skipDuplicates?: boolean
  }

  export type SchoolUpsertWithWhereUniqueWithoutFoundationInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutFoundationInput, SchoolUncheckedUpdateWithoutFoundationInput>
    create: XOR<SchoolCreateWithoutFoundationInput, SchoolUncheckedCreateWithoutFoundationInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutFoundationInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutFoundationInput, SchoolUncheckedUpdateWithoutFoundationInput>
  }

  export type SchoolUpdateManyWithWhereWithoutFoundationInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutFoundationInput>
  }

  export type SchoolScalarWhereInput = {
    AND?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
    OR?: SchoolScalarWhereInput[]
    NOT?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
    id?: StringFilter<"School"> | string
    foundationId?: StringFilter<"School"> | string
    code?: StringFilter<"School"> | string
    name?: StringFilter<"School"> | string
    level?: StringFilter<"School"> | string
    address?: StringFilter<"School"> | string
    phone?: StringFilter<"School"> | string
    logoUrl?: StringNullableFilter<"School"> | string | null
    orderIndex?: IntFilter<"School"> | number
    createdAt?: DateTimeFilter<"School"> | Date | string
    updatedAt?: DateTimeFilter<"School"> | Date | string
  }

  export type FoundationCreateWithoutSchoolsInput = {
    id?: string
    name?: string
    tagline?: string
    logoUrl?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoundationUncheckedCreateWithoutSchoolsInput = {
    id?: string
    name?: string
    tagline?: string
    logoUrl?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FoundationCreateOrConnectWithoutSchoolsInput = {
    where: FoundationWhereUniqueInput
    create: XOR<FoundationCreateWithoutSchoolsInput, FoundationUncheckedCreateWithoutSchoolsInput>
  }

  export type AdminUserCreateWithoutSchoolInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUncheckedCreateWithoutSchoolInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserCreateOrConnectWithoutSchoolInput = {
    where: AdminUserWhereUniqueInput
    create: XOR<AdminUserCreateWithoutSchoolInput, AdminUserUncheckedCreateWithoutSchoolInput>
  }

  export type AdminUserCreateManySchoolInputEnvelope = {
    data: AdminUserCreateManySchoolInput | AdminUserCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type SiteProfileCreateWithoutSchoolInput = {
    id?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroMascotUrl?: string
    ctaTitle?: string
    ctaSubtitle?: string
    phone?: string
    instagram?: string
    facebook?: string
    address?: string | null
    updatedAt?: Date | string
  }

  export type SiteProfileUncheckedCreateWithoutSchoolInput = {
    id?: string
    heroBadge?: string
    heroTitle?: string
    heroSubtitle?: string
    heroMascotUrl?: string
    ctaTitle?: string
    ctaSubtitle?: string
    phone?: string
    instagram?: string
    facebook?: string
    address?: string | null
    updatedAt?: Date | string
  }

  export type SiteProfileCreateOrConnectWithoutSchoolInput = {
    where: SiteProfileWhereUniqueInput
    create: XOR<SiteProfileCreateWithoutSchoolInput, SiteProfileUncheckedCreateWithoutSchoolInput>
  }

  export type ProgramCreateWithoutSchoolInput = {
    id?: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramUncheckedCreateWithoutSchoolInput = {
    id?: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramCreateOrConnectWithoutSchoolInput = {
    where: ProgramWhereUniqueInput
    create: XOR<ProgramCreateWithoutSchoolInput, ProgramUncheckedCreateWithoutSchoolInput>
  }

  export type ProgramCreateManySchoolInputEnvelope = {
    data: ProgramCreateManySchoolInput | ProgramCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type GalleryItemCreateWithoutSchoolInput = {
    id?: string
    title: string
    imageUrl: string
    folder?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type GalleryItemUncheckedCreateWithoutSchoolInput = {
    id?: string
    title: string
    imageUrl: string
    folder?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type GalleryItemCreateOrConnectWithoutSchoolInput = {
    where: GalleryItemWhereUniqueInput
    create: XOR<GalleryItemCreateWithoutSchoolInput, GalleryItemUncheckedCreateWithoutSchoolInput>
  }

  export type GalleryItemCreateManySchoolInputEnvelope = {
    data: GalleryItemCreateManySchoolInput | GalleryItemCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type TestimonialCreateWithoutSchoolInput = {
    id?: string
    parentName: string
    role?: string
    initials: string
    content: string
    rating?: number
    bgColor?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type TestimonialUncheckedCreateWithoutSchoolInput = {
    id?: string
    parentName: string
    role?: string
    initials: string
    content: string
    rating?: number
    bgColor?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type TestimonialCreateOrConnectWithoutSchoolInput = {
    where: TestimonialWhereUniqueInput
    create: XOR<TestimonialCreateWithoutSchoolInput, TestimonialUncheckedCreateWithoutSchoolInput>
  }

  export type TestimonialCreateManySchoolInputEnvelope = {
    data: TestimonialCreateManySchoolInput | TestimonialCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type PpdbRegistrationCreateWithoutSchoolInput = {
    id?: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl?: string | null
    docAktaUrl?: string | null
    docFotoUrl?: string | null
    docKtpUrl?: string | null
    buktiBayarUrl?: string | null
    paymentMethod?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PpdbRegistrationUncheckedCreateWithoutSchoolInput = {
    id?: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl?: string | null
    docAktaUrl?: string | null
    docFotoUrl?: string | null
    docKtpUrl?: string | null
    buktiBayarUrl?: string | null
    paymentMethod?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PpdbRegistrationCreateOrConnectWithoutSchoolInput = {
    where: PpdbRegistrationWhereUniqueInput
    create: XOR<PpdbRegistrationCreateWithoutSchoolInput, PpdbRegistrationUncheckedCreateWithoutSchoolInput>
  }

  export type PpdbRegistrationCreateManySchoolInputEnvelope = {
    data: PpdbRegistrationCreateManySchoolInput | PpdbRegistrationCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type FoundationUpsertWithoutSchoolsInput = {
    update: XOR<FoundationUpdateWithoutSchoolsInput, FoundationUncheckedUpdateWithoutSchoolsInput>
    create: XOR<FoundationCreateWithoutSchoolsInput, FoundationUncheckedCreateWithoutSchoolsInput>
    where?: FoundationWhereInput
  }

  export type FoundationUpdateToOneWithWhereWithoutSchoolsInput = {
    where?: FoundationWhereInput
    data: XOR<FoundationUpdateWithoutSchoolsInput, FoundationUncheckedUpdateWithoutSchoolsInput>
  }

  export type FoundationUpdateWithoutSchoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoundationUncheckedUpdateWithoutSchoolsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tagline?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUpsertWithWhereUniqueWithoutSchoolInput = {
    where: AdminUserWhereUniqueInput
    update: XOR<AdminUserUpdateWithoutSchoolInput, AdminUserUncheckedUpdateWithoutSchoolInput>
    create: XOR<AdminUserCreateWithoutSchoolInput, AdminUserUncheckedCreateWithoutSchoolInput>
  }

  export type AdminUserUpdateWithWhereUniqueWithoutSchoolInput = {
    where: AdminUserWhereUniqueInput
    data: XOR<AdminUserUpdateWithoutSchoolInput, AdminUserUncheckedUpdateWithoutSchoolInput>
  }

  export type AdminUserUpdateManyWithWhereWithoutSchoolInput = {
    where: AdminUserScalarWhereInput
    data: XOR<AdminUserUpdateManyMutationInput, AdminUserUncheckedUpdateManyWithoutSchoolInput>
  }

  export type AdminUserScalarWhereInput = {
    AND?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
    OR?: AdminUserScalarWhereInput[]
    NOT?: AdminUserScalarWhereInput | AdminUserScalarWhereInput[]
    id?: StringFilter<"AdminUser"> | string
    schoolId?: StringNullableFilter<"AdminUser"> | string | null
    username?: StringFilter<"AdminUser"> | string
    passwordHash?: StringFilter<"AdminUser"> | string
    name?: StringFilter<"AdminUser"> | string
    role?: StringFilter<"AdminUser"> | string
    createdAt?: DateTimeFilter<"AdminUser"> | Date | string
    updatedAt?: DateTimeFilter<"AdminUser"> | Date | string
  }

  export type SiteProfileUpsertWithoutSchoolInput = {
    update: XOR<SiteProfileUpdateWithoutSchoolInput, SiteProfileUncheckedUpdateWithoutSchoolInput>
    create: XOR<SiteProfileCreateWithoutSchoolInput, SiteProfileUncheckedCreateWithoutSchoolInput>
    where?: SiteProfileWhereInput
  }

  export type SiteProfileUpdateToOneWithWhereWithoutSchoolInput = {
    where?: SiteProfileWhereInput
    data: XOR<SiteProfileUpdateWithoutSchoolInput, SiteProfileUncheckedUpdateWithoutSchoolInput>
  }

  export type SiteProfileUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    heroMascotUrl?: StringFieldUpdateOperationsInput | string
    ctaTitle?: StringFieldUpdateOperationsInput | string
    ctaSubtitle?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteProfileUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    heroBadge?: StringFieldUpdateOperationsInput | string
    heroTitle?: StringFieldUpdateOperationsInput | string
    heroSubtitle?: StringFieldUpdateOperationsInput | string
    heroMascotUrl?: StringFieldUpdateOperationsInput | string
    ctaTitle?: StringFieldUpdateOperationsInput | string
    ctaSubtitle?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    instagram?: StringFieldUpdateOperationsInput | string
    facebook?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUpsertWithWhereUniqueWithoutSchoolInput = {
    where: ProgramWhereUniqueInput
    update: XOR<ProgramUpdateWithoutSchoolInput, ProgramUncheckedUpdateWithoutSchoolInput>
    create: XOR<ProgramCreateWithoutSchoolInput, ProgramUncheckedCreateWithoutSchoolInput>
  }

  export type ProgramUpdateWithWhereUniqueWithoutSchoolInput = {
    where: ProgramWhereUniqueInput
    data: XOR<ProgramUpdateWithoutSchoolInput, ProgramUncheckedUpdateWithoutSchoolInput>
  }

  export type ProgramUpdateManyWithWhereWithoutSchoolInput = {
    where: ProgramScalarWhereInput
    data: XOR<ProgramUpdateManyMutationInput, ProgramUncheckedUpdateManyWithoutSchoolInput>
  }

  export type ProgramScalarWhereInput = {
    AND?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    OR?: ProgramScalarWhereInput[]
    NOT?: ProgramScalarWhereInput | ProgramScalarWhereInput[]
    id?: StringFilter<"Program"> | string
    schoolId?: StringFilter<"Program"> | string
    title?: StringFilter<"Program"> | string
    ageRange?: StringFilter<"Program"> | string
    iconUrl?: StringFilter<"Program"> | string
    features?: StringFilter<"Program"> | string
    orderIndex?: IntFilter<"Program"> | number
    createdAt?: DateTimeFilter<"Program"> | Date | string
    updatedAt?: DateTimeFilter<"Program"> | Date | string
  }

  export type GalleryItemUpsertWithWhereUniqueWithoutSchoolInput = {
    where: GalleryItemWhereUniqueInput
    update: XOR<GalleryItemUpdateWithoutSchoolInput, GalleryItemUncheckedUpdateWithoutSchoolInput>
    create: XOR<GalleryItemCreateWithoutSchoolInput, GalleryItemUncheckedCreateWithoutSchoolInput>
  }

  export type GalleryItemUpdateWithWhereUniqueWithoutSchoolInput = {
    where: GalleryItemWhereUniqueInput
    data: XOR<GalleryItemUpdateWithoutSchoolInput, GalleryItemUncheckedUpdateWithoutSchoolInput>
  }

  export type GalleryItemUpdateManyWithWhereWithoutSchoolInput = {
    where: GalleryItemScalarWhereInput
    data: XOR<GalleryItemUpdateManyMutationInput, GalleryItemUncheckedUpdateManyWithoutSchoolInput>
  }

  export type GalleryItemScalarWhereInput = {
    AND?: GalleryItemScalarWhereInput | GalleryItemScalarWhereInput[]
    OR?: GalleryItemScalarWhereInput[]
    NOT?: GalleryItemScalarWhereInput | GalleryItemScalarWhereInput[]
    id?: StringFilter<"GalleryItem"> | string
    schoolId?: StringFilter<"GalleryItem"> | string
    title?: StringFilter<"GalleryItem"> | string
    imageUrl?: StringFilter<"GalleryItem"> | string
    folder?: StringFilter<"GalleryItem"> | string
    orderIndex?: IntFilter<"GalleryItem"> | number
    createdAt?: DateTimeFilter<"GalleryItem"> | Date | string
  }

  export type TestimonialUpsertWithWhereUniqueWithoutSchoolInput = {
    where: TestimonialWhereUniqueInput
    update: XOR<TestimonialUpdateWithoutSchoolInput, TestimonialUncheckedUpdateWithoutSchoolInput>
    create: XOR<TestimonialCreateWithoutSchoolInput, TestimonialUncheckedCreateWithoutSchoolInput>
  }

  export type TestimonialUpdateWithWhereUniqueWithoutSchoolInput = {
    where: TestimonialWhereUniqueInput
    data: XOR<TestimonialUpdateWithoutSchoolInput, TestimonialUncheckedUpdateWithoutSchoolInput>
  }

  export type TestimonialUpdateManyWithWhereWithoutSchoolInput = {
    where: TestimonialScalarWhereInput
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyWithoutSchoolInput>
  }

  export type TestimonialScalarWhereInput = {
    AND?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
    OR?: TestimonialScalarWhereInput[]
    NOT?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    schoolId?: StringFilter<"Testimonial"> | string
    parentName?: StringFilter<"Testimonial"> | string
    role?: StringFilter<"Testimonial"> | string
    initials?: StringFilter<"Testimonial"> | string
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    bgColor?: StringFilter<"Testimonial"> | string
    orderIndex?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
  }

  export type PpdbRegistrationUpsertWithWhereUniqueWithoutSchoolInput = {
    where: PpdbRegistrationWhereUniqueInput
    update: XOR<PpdbRegistrationUpdateWithoutSchoolInput, PpdbRegistrationUncheckedUpdateWithoutSchoolInput>
    create: XOR<PpdbRegistrationCreateWithoutSchoolInput, PpdbRegistrationUncheckedCreateWithoutSchoolInput>
  }

  export type PpdbRegistrationUpdateWithWhereUniqueWithoutSchoolInput = {
    where: PpdbRegistrationWhereUniqueInput
    data: XOR<PpdbRegistrationUpdateWithoutSchoolInput, PpdbRegistrationUncheckedUpdateWithoutSchoolInput>
  }

  export type PpdbRegistrationUpdateManyWithWhereWithoutSchoolInput = {
    where: PpdbRegistrationScalarWhereInput
    data: XOR<PpdbRegistrationUpdateManyMutationInput, PpdbRegistrationUncheckedUpdateManyWithoutSchoolInput>
  }

  export type PpdbRegistrationScalarWhereInput = {
    AND?: PpdbRegistrationScalarWhereInput | PpdbRegistrationScalarWhereInput[]
    OR?: PpdbRegistrationScalarWhereInput[]
    NOT?: PpdbRegistrationScalarWhereInput | PpdbRegistrationScalarWhereInput[]
    id?: StringFilter<"PpdbRegistration"> | string
    schoolId?: StringFilter<"PpdbRegistration"> | string
    registrationNo?: StringFilter<"PpdbRegistration"> | string
    namaAnak?: StringFilter<"PpdbRegistration"> | string
    jenisKelamin?: StringFilter<"PpdbRegistration"> | string
    agama?: StringFilter<"PpdbRegistration"> | string
    tempatLahir?: StringFilter<"PpdbRegistration"> | string
    tanggalLahir?: StringFilter<"PpdbRegistration"> | string
    usiaAnak?: StringFilter<"PpdbRegistration"> | string
    program?: StringFilter<"PpdbRegistration"> | string
    namaOrtu?: StringFilter<"PpdbRegistration"> | string
    noWhatsapp?: StringFilter<"PpdbRegistration"> | string
    email?: StringFilter<"PpdbRegistration"> | string
    alamatRumah?: StringFilter<"PpdbRegistration"> | string
    docKkUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docAktaUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docFotoUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    docKtpUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    buktiBayarUrl?: StringNullableFilter<"PpdbRegistration"> | string | null
    paymentMethod?: StringFilter<"PpdbRegistration"> | string
    status?: StringFilter<"PpdbRegistration"> | string
    createdAt?: DateTimeFilter<"PpdbRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PpdbRegistration"> | Date | string
  }

  export type SchoolCreateWithoutAdminUsersInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutAdminUsersInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutAdminUsersInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutAdminUsersInput, SchoolUncheckedCreateWithoutAdminUsersInput>
  }

  export type SchoolUpsertWithoutAdminUsersInput = {
    update: XOR<SchoolUpdateWithoutAdminUsersInput, SchoolUncheckedUpdateWithoutAdminUsersInput>
    create: XOR<SchoolCreateWithoutAdminUsersInput, SchoolUncheckedCreateWithoutAdminUsersInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutAdminUsersInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutAdminUsersInput, SchoolUncheckedUpdateWithoutAdminUsersInput>
  }

  export type SchoolUpdateWithoutAdminUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutAdminUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutSiteProfileInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutSiteProfileInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutSiteProfileInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutSiteProfileInput, SchoolUncheckedCreateWithoutSiteProfileInput>
  }

  export type SchoolUpsertWithoutSiteProfileInput = {
    update: XOR<SchoolUpdateWithoutSiteProfileInput, SchoolUncheckedUpdateWithoutSiteProfileInput>
    create: XOR<SchoolCreateWithoutSiteProfileInput, SchoolUncheckedCreateWithoutSiteProfileInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutSiteProfileInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutSiteProfileInput, SchoolUncheckedUpdateWithoutSiteProfileInput>
  }

  export type SchoolUpdateWithoutSiteProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutSiteProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutProgramsInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutProgramsInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutProgramsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutProgramsInput, SchoolUncheckedCreateWithoutProgramsInput>
  }

  export type SchoolUpsertWithoutProgramsInput = {
    update: XOR<SchoolUpdateWithoutProgramsInput, SchoolUncheckedUpdateWithoutProgramsInput>
    create: XOR<SchoolCreateWithoutProgramsInput, SchoolUncheckedCreateWithoutProgramsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutProgramsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutProgramsInput, SchoolUncheckedUpdateWithoutProgramsInput>
  }

  export type SchoolUpdateWithoutProgramsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutProgramsInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutGalleryItemsInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutGalleryItemsInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutGalleryItemsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutGalleryItemsInput, SchoolUncheckedCreateWithoutGalleryItemsInput>
  }

  export type SchoolUpsertWithoutGalleryItemsInput = {
    update: XOR<SchoolUpdateWithoutGalleryItemsInput, SchoolUncheckedUpdateWithoutGalleryItemsInput>
    create: XOR<SchoolCreateWithoutGalleryItemsInput, SchoolUncheckedCreateWithoutGalleryItemsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutGalleryItemsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutGalleryItemsInput, SchoolUncheckedUpdateWithoutGalleryItemsInput>
  }

  export type SchoolUpdateWithoutGalleryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutGalleryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutTestimonialsInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutTestimonialsInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    ppdbRegistrations?: PpdbRegistrationUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutTestimonialsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutTestimonialsInput, SchoolUncheckedCreateWithoutTestimonialsInput>
  }

  export type SchoolUpsertWithoutTestimonialsInput = {
    update: XOR<SchoolUpdateWithoutTestimonialsInput, SchoolUncheckedUpdateWithoutTestimonialsInput>
    create: XOR<SchoolCreateWithoutTestimonialsInput, SchoolUncheckedCreateWithoutTestimonialsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutTestimonialsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutTestimonialsInput, SchoolUncheckedUpdateWithoutTestimonialsInput>
  }

  export type SchoolUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateWithoutPpdbRegistrationsInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    foundation?: FoundationCreateNestedOneWithoutSchoolsInput
    adminUsers?: AdminUserCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileCreateNestedOneWithoutSchoolInput
    programs?: ProgramCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutPpdbRegistrationsInput = {
    id?: string
    foundationId?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    adminUsers?: AdminUserUncheckedCreateNestedManyWithoutSchoolInput
    siteProfile?: SiteProfileUncheckedCreateNestedOneWithoutSchoolInput
    programs?: ProgramUncheckedCreateNestedManyWithoutSchoolInput
    galleryItems?: GalleryItemUncheckedCreateNestedManyWithoutSchoolInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutPpdbRegistrationsInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutPpdbRegistrationsInput, SchoolUncheckedCreateWithoutPpdbRegistrationsInput>
  }

  export type SchoolUpsertWithoutPpdbRegistrationsInput = {
    update: XOR<SchoolUpdateWithoutPpdbRegistrationsInput, SchoolUncheckedUpdateWithoutPpdbRegistrationsInput>
    create: XOR<SchoolCreateWithoutPpdbRegistrationsInput, SchoolUncheckedCreateWithoutPpdbRegistrationsInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutPpdbRegistrationsInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutPpdbRegistrationsInput, SchoolUncheckedUpdateWithoutPpdbRegistrationsInput>
  }

  export type SchoolUpdateWithoutPpdbRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    foundation?: FoundationUpdateOneRequiredWithoutSchoolsNestedInput
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutPpdbRegistrationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    foundationId?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateManyFoundationInput = {
    id?: string
    code: string
    name: string
    level?: string
    address: string
    phone: string
    logoUrl?: string | null
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SchoolUpdateWithoutFoundationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutFoundationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    adminUsers?: AdminUserUncheckedUpdateManyWithoutSchoolNestedInput
    siteProfile?: SiteProfileUncheckedUpdateOneWithoutSchoolNestedInput
    programs?: ProgramUncheckedUpdateManyWithoutSchoolNestedInput
    galleryItems?: GalleryItemUncheckedUpdateManyWithoutSchoolNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutSchoolNestedInput
    ppdbRegistrations?: PpdbRegistrationUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutFoundationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserCreateManySchoolInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    role?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProgramCreateManySchoolInput = {
    id?: string
    title: string
    ageRange: string
    iconUrl: string
    features: string
    orderIndex?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GalleryItemCreateManySchoolInput = {
    id?: string
    title: string
    imageUrl: string
    folder?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type TestimonialCreateManySchoolInput = {
    id?: string
    parentName: string
    role?: string
    initials: string
    content: string
    rating?: number
    bgColor?: string
    orderIndex?: number
    createdAt?: Date | string
  }

  export type PpdbRegistrationCreateManySchoolInput = {
    id?: string
    registrationNo: string
    namaAnak: string
    jenisKelamin: string
    agama: string
    tempatLahir: string
    tanggalLahir: string
    usiaAnak: string
    program: string
    namaOrtu: string
    noWhatsapp: string
    email: string
    alamatRumah: string
    docKkUrl?: string | null
    docAktaUrl?: string | null
    docFotoUrl?: string | null
    docKtpUrl?: string | null
    buktiBayarUrl?: string | null
    paymentMethod?: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminUserUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminUserUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProgramUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    ageRange?: StringFieldUpdateOperationsInput | string
    iconUrl?: StringFieldUpdateOperationsInput | string
    features?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GalleryItemUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: StringFieldUpdateOperationsInput | string
    folder?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentName?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    initials?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    bgColor?: StringFieldUpdateOperationsInput | string
    orderIndex?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PpdbRegistrationUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PpdbRegistrationUncheckedUpdateWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PpdbRegistrationUncheckedUpdateManyWithoutSchoolInput = {
    id?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    namaAnak?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    agama?: StringFieldUpdateOperationsInput | string
    tempatLahir?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: StringFieldUpdateOperationsInput | string
    usiaAnak?: StringFieldUpdateOperationsInput | string
    program?: StringFieldUpdateOperationsInput | string
    namaOrtu?: StringFieldUpdateOperationsInput | string
    noWhatsapp?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    alamatRumah?: StringFieldUpdateOperationsInput | string
    docKkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docAktaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docFotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    docKtpUrl?: NullableStringFieldUpdateOperationsInput | string | null
    buktiBayarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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