type RouteWithAbsolutePath<T extends Anchor> = Omit<T, "routes"> & {
    absolute: string;
} & (T["routes"] extends {}
        ? {
              routes: {
                  [K in keyof T["routes"]]: RouteWithAbsolutePath<
                      (T["routes"] & {})[K]
                  >;
              };
          }
        : {});

export function RoutesWithAbsolutePaths<T extends Record<string, Anchor>>(
    routes: T,
    parentsPath: string = ""
): { [K in keyof T]: RouteWithAbsolutePath<T[K]> } {
    return Object.entries(routes).reduce((accumulator, [key, value]) => {
        const absolute = `${parentsPath}/${value.href}`;

        return value.routes == null
            ? { ...accumulator, [key]: { ...value, absolute } }
            : {
                  ...accumulator,
                  [key]: {
                      ...value,
                      absolute,
                      routes: RoutesWithAbsolutePaths(value.routes, absolute),
                  },
              };
    }, {}) as { [K in keyof T]: RouteWithAbsolutePath<T[K]> };
}
