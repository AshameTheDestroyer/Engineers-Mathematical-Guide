type Anchor = {
    href: string;
    title?: string;
    isVariable?: boolean;
    routes?: Record<string, Anchor>;
};

type AnchorWithAbsolutePath<T extends Anchor> = Omit<
    T,
    "routes" | "isVariable"
> & {
    absolute: string;
} & (T["routes"] extends {}
        ? {
              routes: {
                  [K in keyof T["routes"]]: AnchorWithAbsolutePath<
                      (T["routes"] & {})[K]
                  >;
              };
          }
        : {}) &
    (T["isVariable"] extends true
        ? { MapVariable: (value: string, relative = false) => string }
        : {});

type AbsoluteAnchor<T extends Record<string, Anchor>> = {
    [K in keyof T]: AnchorWithAbsolutePath<T[K]>;
};
