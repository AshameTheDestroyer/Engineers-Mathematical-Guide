type Tuple<T, N extends number, R extends T[] = []> = R["length"] extends N
    ? R
    : Tuple<T, N, [T, ...R]>;

type Append<T extends any[], V> = [...T, V];
type Prepend<T extends any[], V> = [V, ...T];

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I
) => void
    ? I
    : never;

type LastOf<T> =
    UnionToIntersection<T extends any ? () => T : never> extends () => infer R
        ? R
        : never;

type UnionToTuple<T, ASC extends boolean = false, C extends any[] = []> = [
    T,
] extends [never]
    ? C
    : LastOf<T> extends infer L
      ? UnionToTuple<
            Exclude<T, L>,
            ASC,
            ASC extends false ? Prepend<C, L> : Append<C, L>
        >
      : never;
