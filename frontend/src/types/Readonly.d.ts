type ReadonlyDeep<T> = {
    readonly [Key in keyof T]: T[Key] extends object ? ReadonlyDeep<T[Key]> : T[Key];
};

type ReadonlyExceptFor<T, TMutableKeys extends keyof T> =
    Readonly<Omit<T, TMutableKeys>> & Pick<T, TMutableKeys>;

type ReadonlyDeepExceptFor<T, TMutableKeys extends keyof T> =
    ReadonlyDeep<Omit<T, TMutableKeys>> & Pick<T, TMutableKeys>;

type WithReadonly<T, Keys extends keyof T> = Omit<T, Keys> & { readonly [Key in Keys]: T[Key]; };