type Falsy = false | "" | 0 | 0n | null | undefined;
type Truthy<T> = T extends Falsy ? never : T;