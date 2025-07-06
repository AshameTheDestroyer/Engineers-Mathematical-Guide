import { Drawer } from "../Drawer";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { Image } from "@/components/Image/Image";
import { Button } from "@/components/Button/Button";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { PROFILE_ROUTES } from "@/routes/profile.routes";
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

import profile_dummy_data from "@data/profile.dummy.json";
import { Logo } from "@/components/Logo/Logo";

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
                    direction == "ltr" ? "pl-10 pr-4" : "pl-4 pr-10",
                    "pb-4 pt-12"
                )}
                hasCloseButton
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                dir={direction == "rtl" ? "ltr" : "rtl"}
                direction={direction == "rtl" ? "left" : "right"}
                closeButtonProps={{
                    className:
                        direction == "ltr"
                            ? "left-4 right-auto"
                            : "right-4 left-auto",
                    isSquare: true,
                }}
            >
                <Flexbox
                    className={twJoin("mb-8", direction == "ltr" ? "" : "")}
                    gap="4"
                    placeItems="center"
                >
                    <Button
                        className="aspect-square [&>div[data-content]]:overflow-hidden [&>div[data-thickness]]:h-full [&>div]:rounded-full"
                        variant="primary"
                        link={PROFILE_ROUTES.base.absolute}
                    >
                        <Image
                            className="scale-150"
                            width={48}
                            height={48}
                            source={profile_dummy_data.avatar}
                            alternative={`Image of ${profile_dummy_data.name}'s Profile.`}
                        />
                    </Button>
                    <Flexbox direction="column">
                        <Typography
                            className={twJoin(
                                direction == "ltr" && "text-end",
                                "max-w-44 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap font-bold"
                            )}
                            dir="ltr"
                            variant="p"
                        >
                            {profile_dummy_data.name}
                        </Typography>
                        <Typography
                            className={twJoin(
                                direction == "ltr" && "text-end",
                                "max-w-44 overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap"
                            )}
                            dir="ltr"
                            variant="p"
                        >
                            @{profile_dummy_data.username}
                        </Typography>
                    </Flexbox>
                </Flexbox>

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

                <Logo className="mx-auto mt-auto" />
            </Drawer>
        </>
    );
};
