import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { IconProps } from "../Icon/Icon";
import { Button, ButtonProps } from "@components/Button/Button";

export type IconButtonProps = Omit<ButtonProps, "children" | "icon"> & {
    icon: IconProps;
};

export const IconButton: FC<IconButtonProps> = ({
    id,
    icon,
    className,
    ...props
}) => {
    return (
        <Button
            id={id}
            className={twMerge(
                "aspect-square [&>div[data-thickness]]:h-full [&>div]:rounded-full",
                className
            )}
            icon={{ ...icon, placement: "left" }}
            {...props}
        />
    );
};
