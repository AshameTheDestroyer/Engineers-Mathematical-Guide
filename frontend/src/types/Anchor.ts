import { DetailedUserDTO } from "@/schemas/UserSchema";

export type Anchor = {
    href: string;
    title?: string;
    routes?: Record<string, Anchor>;
    renderingPredicate?: (myUser: DetailedUserDTO | undefined) => boolean;
} & Either<
    {
        isVariable?: false;
    },
    {
        isVariable: true;
        variables?: readonly string[];
    }
>;

export type BuiltAnchor<
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
                      relative: boolean
                  ) => string;
              }
            : {
                  MapVariable: (value: string, relative: boolean) => string;
              }
        : object);

export type NestableBuiltAnchor<T extends Record<string, Anchor>> = {
    [K in keyof T]: BuiltAnchor<T[K]>;
};
