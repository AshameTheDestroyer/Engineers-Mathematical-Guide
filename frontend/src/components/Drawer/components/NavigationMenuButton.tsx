import { Drawer } from "../Drawer";
import { FC, useState } from "react";
import { twJoin } from "tailwind-merge";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { NavigationBarProps } from "@/components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

import menu_icon from "@icons/menu.svg";

export type NavigationMenuButtonProps = Omit<IconButtonProps, "icon"> &
    Pick<NavigationBarProps, "routes">;

export const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({
    id,
    ref,
    routes,
    onClick,
    className,
    variant = "default",
    ...props
}) => {
    const { direction } = useLocalization();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <IconButton
                id={id}
                ref={ref}
                className={className}
                variant={variant}
                icon={{ source: menu_icon }}
                onClick={(e) => (onClick?.(e), setIsOpen(true))}
                {...props}
            />
            <Drawer
                className={twJoin(
                    direction == "ltr" ? "pl-24 pr-8" : "pl-8 pr-24",
                    "pt-20"
                )}
                hasCloseButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                closeButtonProps={{ isSquare: true }}
                dir={direction == "rtl" ? "ltr" : "rtl"}
                direction={direction == "rtl" ? "left" : "right"}
            >
                <NavigationBar direction="column" routes={routes} />
            </Drawer>
        </>
    );
};
