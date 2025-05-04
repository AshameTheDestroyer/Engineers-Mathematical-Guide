import { FC } from "react";
import menu_icon from "@icons/menu.svg";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

export type NavigationMenuButtonProps = Omit<IconButtonProps, "icon">;

export const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({
    id,
    ref,
    onClick,
    className,
    variant = "default",
    ...props
}) => {
    return (
        <IconButton
            className={className}
            id={id}
            ref={ref}
            variant={variant}
            onClick={onClick}
            icon={{ source: menu_icon }}
            {...props}
        />
    );
};
