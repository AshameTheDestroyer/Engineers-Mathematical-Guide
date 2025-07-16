import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";

export type SeparatorProps = ChildlessComponentProps<HTMLHRElement> & {
    thickness?: Thickness;
    orientation: "horizontal" | "vertical";
};

export const Separator: FC<SeparatorProps> = ({
    id,
    ref,
    className,
    orientation,
    thickness = "normal",
}) => {
    return (
        <hr
            id={id}
            ref={ref}
            className={twMerge(
                "border-foreground-dark block h-auto w-auto rounded-full",
                orientation == "horizontal" ? "mx-0 h-0" : "my-0 w-0",
                thickness == "thick"
                    ? "border-3 m-2"
                    : thickness == "thin"
                      ? "border-1 m-0.5"
                      : "m-1 border-2",
                className
            )}
        />
    );
};
