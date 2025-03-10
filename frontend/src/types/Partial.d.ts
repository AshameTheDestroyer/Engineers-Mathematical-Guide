type PartialDeep<T> = {
    [Key in keyof T]?: T[Key] extends object ? PartialDeep<T[Key]> : T[Key];
};

type PartialExceptFor<T, TRequiredKeys extends keyof T> = Partial<T> & Pick<T, TRequiredKeys>;

type PartialDeepExceptFor<T, TRequiredKeys extends keyof T> = PartialDeep<T> & Pick<T, TRequiredKeys>;

type WithPartial<T, Keys extends keyof T> = T | { [Key in Keys]?: T[Key]; };