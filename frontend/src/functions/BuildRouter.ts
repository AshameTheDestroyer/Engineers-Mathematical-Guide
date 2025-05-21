export function BuildRouter<T extends Record<string, Anchor>>(
    routes: T,
    parentsPath: string = ""
): AbsoluteAnchor<T> {
    return Object.entries(routes).reduce((accumulator, [key, value]) => {
        const absolute = `${parentsPath}/${value.href}`
            .replace(/^\/\//, "/")
            .replace(/.\/$/, (item) => item.slice(0, -1));

        return value.routes == null
            ? { ...accumulator, [key]: { ...value, absolute } }
            : {
                  ...accumulator,
                  [key]: {
                      ...value,
                      absolute,
                      routes: BuildRouter(value.routes, absolute),
                  },
              };
    }, {}) as AbsoluteAnchor<T>;
}
