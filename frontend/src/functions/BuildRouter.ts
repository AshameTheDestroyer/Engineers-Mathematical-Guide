import { Anchor, NestableBuiltAnchor } from "@/types/Anchor";

export function BuildRouter<T extends Record<string, Anchor>>(
    routes: T,
    parentsPath: string = ""
): NestableBuiltAnchor<T> {
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
                      MapVariables: (
                          values: Record<string, string>,
                          relative = false
                      ) =>
                          Object.entries(values).reduce(
                              (accumulator, [key, value]) =>
                                  accumulator.replace(`:${key}`, value),
                              relative ? href : absolute
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
    }, {}) as NestableBuiltAnchor<T>;
}
