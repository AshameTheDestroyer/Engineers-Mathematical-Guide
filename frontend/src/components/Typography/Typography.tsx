import { twJoin } from "tailwind-merge";
import { FC, HTMLAttributes } from "react";
import { ComponentProps } from "@/types/ComponentProps";

export type TypographyProps<
    T extends HTMLElement = HTMLElement,
    U extends HTMLAttributes<T> = HTMLAttributes<HTMLElement>,
> = {
    variant: TypographyElement;
} & ComponentProps<HTMLElement> &
    U;

export const Typography = <
    T extends HTMLElement = HTMLElement,
    U extends HTMLAttributes<T> = HTMLAttributes<HTMLElement>,
>({
    id,
    ref,
    variant,
    children,
    className,
    ...props
}: TypographyProps<T, U>): ReturnType<FC> => {
    const Element = variant;

    return (
        <Element
            id={id}
            ref={ref}
            className={twJoin("typography", className)}
            {...(props as any)}
        >
            {children}
        </Element>
    );
};
