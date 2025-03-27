import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ComponentProps } from "@types_/ComponentProps";

export type ButtonBoxProps = ComponentProps & {
    direction?: "column" | "row";
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
                "flex place-items-stretch gap-4",
                direction == "column" ? "flex-col" : "flex-row",
                className
            )}
        >
            {children}
        </div>
    );
};
