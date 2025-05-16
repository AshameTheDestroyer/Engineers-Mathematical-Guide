import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@/types/ComponentProps";
import { CSSProperties, ElementType, FC, HTMLAttributes } from "react";

export type FlexboxProps<
    T extends HTMLElement = HTMLElement,
    U extends HTMLAttributes<T> = HTMLAttributes<HTMLElement>,
> = {
    variant?: ElementType;
    wrap?: CSSProperties["flexWrap"];
    direction?: CSSProperties["flexDirection"];
} & Pick<
    CSSProperties,
    | "placeItems"
    | "alignItems"
    | "justifyItems"
    | "placeContent"
    | "alignContent"
    | "justifyContent"
> &
    EitherOrNeither<
        { gap?: number | `${number}` },
        { rowGap?: number | `${number}`; columnGap?: number | `${number}` }
    > &
    ComponentProps<HTMLElement> &
    U;

export const Flexbox: FC<FlexboxProps> = ({
    id,
    ref,
    gap,
    wrap,
    style,
    rowGap,
    children,
    columnGap,
    direction,
    className,
    placeItems,
    alignItems,
    justifyItems,
    placeContent,
    alignContent,
    justifyContent,
    variant = "div",
    ...props
}) => {
    const calculateSpacing = (value: number | `${number}` | undefined) =>
        value != null ? `calc(var(--spacing, 1rem) * ${value})` : undefined;

    const Element = variant;

    return (
        <Element
            id={id}
            ref={ref}
            className={twMerge("flex", className)}
            style={Object.fromEntries(
                Object.entries({
                    placeItems,
                    alignItems,
                    justifyItems,
                    placeContent,
                    alignContent,
                    justifyContent,
                    flexWrap: wrap,
                    flexDirection: direction,
                    gap: calculateSpacing(gap),
                    rowGap: calculateSpacing(rowGap),
                    columnGap: calculateSpacing(columnGap),
                    ...style,
                }).filter(([_key, value]) => value != null)
            )}
            {...props}
        >
            {children}
        </Element>
    );
};
