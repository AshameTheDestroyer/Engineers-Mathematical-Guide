type Anchor = {
    href: string;
    title?: string;
    routes?: Record<string, Anchor>;
};

type AnchorWithAbsolutePath<T extends Anchor> = Omit<T, "routes"> & {
    absolute: string;
} & (T["routes"] extends {}
        ? {
              routes: {
                  [K in keyof T["routes"]]: AnchorWithAbsolutePath<
                      (T["routes"] & {})[K]
                  >;
              };
          }
        : {});

type AbsoluteAnchor<T extends Record<string, Anchor>> = {
    [K in keyof T]: AnchorWithAbsolutePath<T[K]>;
};
