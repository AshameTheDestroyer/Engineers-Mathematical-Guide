type Anchor = {
    href: string;
    title?: string;
    routes?: Record<string, Anchor>;
} & Either<
    {
        isVariable?: false;
    },
    {
        isVariable: true;
        variables?: readonly Array<string>;
    }
>;

type BuiltAnchor<
    T extends Anchor,
    U extends readonly string[] = T["variables"] extends readonly string[]
        ? T["variables"]
        : never,
> = Omit<T, "routes" | "isVariable"> & {
    absolute: string;
} & (T["routes"] extends object
        ? {
              routes: {
                  [K in keyof T["routes"]]: BuiltAnchor<
                      (T["routes"] & object)[K]
                  >;
              };
          }
        : object) &
    (T["isVariable"] extends true
        ? T["variables"] extends U
            ? {
                  variables: U;
                  MapVariables: (
                      value: Record<U[number], string>,
                      relative = false
                  ) => string;
              }
            : {
                  MapVariable: (value: string, relative = false) => string;
              }
        : object);

type NestableBuiltAnchor<T extends Record<string, Anchor>> = {
    [K in keyof T]: BuiltAnchor<T[K]>;
};
