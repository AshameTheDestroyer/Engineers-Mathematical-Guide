import { PropsWithChildren } from "react";

export function ComposeProviders(
    ...providers: Array<
        (props: PropsWithChildren) => PropsWithChildren["children"]
    >
) {
    return ({ children }: PropsWithChildren) =>
        providers.reduceRight(
            (accumulator, Provider) => <Provider>{accumulator}</Provider>,
            children
        );
}
