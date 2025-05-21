export function BuildRouter<T extends Record<string, Anchor>>(
    routes: T,
    parentsPath: string = ""
): AbsoluteAnchor<T> {
    return Object.entries(routes).reduce((accumulator, [key, value]) => {
        const absolute = `${parentsPath}/${value.href}`
            .replace(/^\/\//, "/")
            .replace(/.\/$/, (item) => item.slice(0, -1));

        const title = value.title ?? value.href.toTitleCase();

        return value.routes == null
            ? { ...accumulator, [key]: { ...value, title, absolute } }
            : {
                  ...accumulator,
                  [key]: {
                      ...value,
                      title,
                      absolute,
                      routes: BuildRouter(value.routes, absolute),
                  },
              };
    }, {}) as AbsoluteAnchor<T>;
}
