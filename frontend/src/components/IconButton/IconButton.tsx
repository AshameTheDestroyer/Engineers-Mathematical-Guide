import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { IconProps } from "../Icon/Icon";
import { Button, ButtonProps } from "@components/Button/Button";

export type IconButtonProps = Omit<
    ButtonProps,
    "children" | "icon" | "doesTextGrow"
> & {
    icon: IconProps;
    isSquare?: boolean;
};

export const IconButton: FC<IconButtonProps> = ({
    id,
    icon,
    isSquare,
    className,
    thickness = "normal",
    ...props
}) => {
    return (
        <Button
            id={id}
            className={twMerge(
                "aspect-square",
                thickness == "thin" && "[&>div[data-content]]:p-1",
                !isSquare &&
                    "[&>div[data-thickness]]:h-full [&>div]:rounded-full",
                className
            )}
            thickness={thickness}
            icon={{
                ...(thickness == "thin" ? { width: 20, height: 20 } : {}),
                ...icon,
                placement: "left",
            }}
            {...props}
        />
    );
};
