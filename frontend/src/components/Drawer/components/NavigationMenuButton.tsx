import { FC, useState } from "react";
import menu_icon from "@icons/menu.svg";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";
import { Drawer } from "../Drawer";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { NavigationBarProps } from "@/components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

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
                className="px-16"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                direction={direction == "rtl" ? "left" : "right"}
            >
                <NavigationBar direction="column" routes={routes} />
            </Drawer>
        </>
    );
};
