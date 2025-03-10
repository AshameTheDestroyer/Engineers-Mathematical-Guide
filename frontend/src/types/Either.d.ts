type Either<T1, T2> =
    | ({ [Key1 in keyof T1]: T1[Key1] }
        & { [Key2 in keyof T2 as Key2 extends keyof T1 ? never : Key2]?: never })
    | ({ [Key2 in keyof T2]: T2[Key2] }
        & { [Key1 in keyof T1 as Key1 extends keyof T2 ? never : Key1]?: never });

type EitherOrNeither<T1, T2> = Either<T1, T2>
    | ({ [Key1 in keyof T1]?: never } & { [Key2 in keyof T2]?: never });