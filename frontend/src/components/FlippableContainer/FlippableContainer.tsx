import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@/types/ComponentProps";
import {
    FC,
    useState,
    ElementType,
    HTMLAttributes,
    PropsWithChildren,
} from "react";

export type FlippableContainerProps<
    T extends HTMLElement = HTMLElement,
    U extends HTMLAttributes<T> = HTMLAttributes<HTMLElement>,
> = { variant?: ElementType; flipType?: "hover" | "click" } & Record<
    "frontChild" | "backChild",
    PropsWithChildren["children"]
> &
    ComponentProps<HTMLDivElement> &
    U;

export const FlippableContainer: FC<FlippableContainerProps> = ({
    id,
    ref,
    onClick,
    children,
    className,
    backChild,
    frontChild,
    variant = "div",
    flipType = "hover",
    ...props
}) => {
    const Element = variant;

    const [doesShowFront, setDoesShowFront] = useState(true);

    return (
        <Element
            id={id}
            ref={ref}
            className={twMerge(
                "perspective-distant relative",
                flipType == "click"
                    ? `cursor-pointer ${doesShowFront && "[&>div]:rotate-y-180"}`
                    : "hover:[&>div]:rotate-y-180",
                className
            )}
            onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => (
                onClick?.(e),
                flipType == "click" &&
                    setDoesShowFront((doesShowFront) => !doesShowFront)
            )}
            {...props}
        >
            <div className="transform-3d absolute inset-0 duration-500">
                <div className="backface-hidden absolute inset-0">
                    {frontChild}
                </div>
                <div className="backface-hidden rotate-y-180 absolute inset-0">
                    {backChild}
                </div>
            </div>
        </Element>
    );
};
