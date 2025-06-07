type Anchor = {
    href: string;
    title?: string;
    isVariable?: boolean;
    routes?: Record<string, Anchor>;
};

type BuiltAnchor<T extends Anchor> = Omit<T, "routes" | "isVariable"> & {
    absolute: string;
} & (T["routes"] extends {}
        ? {
              routes: {
                  [K in keyof T["routes"]]: BuiltAnchor<(T["routes"] & {})[K]>;
              };
          }
        : {}) &
    (T["isVariable"] extends true
        ? { MapVariable: (value: string, relative = false) => string }
        : {});

type NestableBuiltAnchor<T extends Record<string, Anchor>> = {
    [K in keyof T]: BuiltAnchor<T[K]>;
};
