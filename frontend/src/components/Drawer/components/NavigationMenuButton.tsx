import { FC, useState } from "react";
import menu_icon from "@icons/menu.svg";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";
import { Drawer } from "../Drawer";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { NavigationBarProps } from "@/components/NavigationBar/NavigationBar";

export type NavigationMenuButtonProps = Omit<IconButtonProps, "icon"> &
    Pick<NavigationBarProps, "routes">;

export const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({
    id,
    ref,
    className,
    onClick,
    routes,
    variant = "default",
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton
                id={id}
                ref={ref}
                className={className}
                variant={variant}
                icon={{ source: menu_icon }}
                onClick={(e) => (onClick?.(e), setIsOpen((isOpen) => !isOpen))}
                {...props}
            />
            <Drawer isOpen={isOpen} setIsOpen={setIsOpen} direction="left">
                <NavigationBar direction="column" routes={routes} />
            </Drawer>
        </>
    );
};
