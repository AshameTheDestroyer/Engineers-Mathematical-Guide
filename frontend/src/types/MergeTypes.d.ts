type MergeTypes<Types extends any[], TResult = {}> = Types extends [
    infer THead,
    ...infer TRemainder,
]
    ? MergeTypes<TRemainder, TResult & THead>
    : TResult;

type OneOf<
    Types extends any[],
    TResult = never,
    TProperties = MergeTypes<Types>,
> = Types extends [infer THead, ...infer TRemainder]
    ? OneOf<TRemainder, TResult | OnlyFirst<THead, TProperties>, TProperties>
    : TResult;

type OneOfTwo<T, U> = OnlyFirst<T, U> | OnlyFirst<U, T>;

type OnlyFirst<T, U> = T & { [K in keyof Omit<U, keyof T>]?: never };
