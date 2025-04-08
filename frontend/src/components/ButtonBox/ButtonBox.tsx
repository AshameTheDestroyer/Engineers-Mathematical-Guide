import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";

export type ButtonBoxProps = ComponentProps & {
    direction?: "column" | "row" | "reverse-column" | "reverse-row";
};

export const ButtonBox: FC<ButtonBoxProps> = ({
    id,
    children,
    className,
    direction = "row",
}) => {
    return (
        <div
            id={id}
            className={twMerge(
                "flex flex-wrap place-items-stretch gap-4",
                direction == "column"
                    ? "flex-col"
                    : direction == "reverse-column"
                      ? "flex-col-reverse"
                      : direction == "reverse-row"
                        ? "flex-row-reverse"
                        : "flex-row",
                className
            )}
        >
            {children}
        </div>
    );
};
