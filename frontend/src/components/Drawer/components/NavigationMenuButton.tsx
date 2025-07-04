import { Drawer } from "../Drawer";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { Typography } from "@/components/Typography/Typography";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { NavigationBarProps } from "@/components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

import menu_icon from "@icons/menu.svg";
import arrow_icon from "@icons/direction_arrow.svg";

export type NavigationMenuButtonProps = Omit<IconButtonProps, "icon"> &
    Pick<NavigationBarProps, "routes" | "base">;

export const NavigationMenuButton: FC<NavigationMenuButtonProps> = ({
    id,
    ref,
    base,
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
                <NavigationBar
                    className="[&>ul]:gap-0"
                    base={base}
                    routes={routes}
                    direction="column"
                    Renders={(route, i, array) => (
                        <Link
                            key={i}
                            className="flex place-items-center gap-1 overflow-clip py-2"
                            to={route.href}
                        >
                            <Icon
                                className={twJoin(
                                    "text-primary-normal scale-75 transition duration-150",
                                    direction == "ltr"
                                        ? "-rotate-90"
                                        : "rotate-90",
                                    !route.selected &&
                                        (array.findIndex(
                                            (route) => route.selected
                                        ) > i
                                            ? "translate-y-[100%]"
                                            : "-translate-y-[100%]")
                                )}
                                source={arrow_icon}
                            />
                            <Typography
                                className={
                                    route.selected ? "text-primary-normal" : ""
                                }
                                variant="p"
                            >
                                {route.title}
                            </Typography>
                        </Link>
                    )}
                />
            </Drawer>
        </>
    );
};
