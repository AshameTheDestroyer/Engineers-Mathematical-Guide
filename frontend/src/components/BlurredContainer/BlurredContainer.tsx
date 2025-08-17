import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@/types/ComponentProps";
import { CSSProperties, ElementType, FC, HTMLAttributes } from "react";

import "./blurred_container.css";

export type BlurredContainerProps<
    T extends HTMLElement = HTMLElement,
    U extends HTMLAttributes<T> = HTMLAttributes<HTMLElement>,
> = {
    variant?: ElementType;
    blurPercentage?: `${number}%`;
    blurType?:
        | "top"
        | "left"
        | "none"
        | "right"
        | "bottom"
        | "radial"
        | "vertical"
        | "horizontal"
        | "rectangular";
} & ComponentProps<HTMLDivElement> &
    U;

export const BlurredContainer: FC<BlurredContainerProps> = ({
    id,
    ref,
    style,
    children,
    className,
    blurPercentage,
    variant = "div",
    blurType = "rectangular",
    ...props
}) => {
    const Element = variant;
    return (
        <Element
            id={id}
            ref={ref}
            className={twMerge(
                "blurred-container relative h-full w-full overflow-hidden",
                `${blurType}-blur`,
                className
            )}
            style={
                {
                    ...style,
                    "--blur-percentage": blurPercentage,
                } as CSSProperties
            }
            {...props}
        >
            <div className="absolute inset-0">{children}</div>
        </Element>
    );
};
