type RequiredDeep<T> = { [Key in keyof T]-?: RequiredDeep<T[Key]>; };

type RequiredExceptFor<T, TPartialKeys extends keyof T> =
    Required<T> | Pick<T, TPartialKeys>;

type RequiredDeepExceptFor<T, TPartialKeys extends keyof T> =
    RequiredDeep<T> | Pick<T, TPartialKeys>;

type WithRequired<T, Keys extends keyof T> = T & { [Key in Keys]-?: T[Key]; };