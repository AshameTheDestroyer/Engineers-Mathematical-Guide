export function BuildRouter<T extends Record<string, Anchor>>(
    routes: T,
    parentsPath: string = ""
): AbsoluteAnchor<T> {
    return Object.entries(routes).reduce((accumulator, [key, value]) => {
        const href = value.href;
        const absolute = `${parentsPath}/${href}`
            .replace(/^\/\//, "/")
            .replace(/.\/$/, (item) => item.slice(0, -1));

        const value_ = {
            ...Object.omit(value, "isVariable"),
            ...(value.isVariable
                ? {
                      MapVariable: (value: string, relative = false) =>
                          (relative ? href : absolute).replace(
                              `:${key}`,
                              value
                          ),
                  }
                : {}),
        };

        return value_.routes == null
            ? { ...accumulator, [key]: { ...value_, absolute } }
            : {
                  ...accumulator,
                  [key]: {
                      ...value_,
                      absolute,
                      routes: BuildRouter(value_.routes, absolute),
                  },
              };
    }, {}) as AbsoluteAnchor<T>;
}
