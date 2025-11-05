export type LooseString<T extends string> = T | Omit<string, T>;
export type LooseRecord<T extends string, U> = Record<T, U> & Record<string, U>;
