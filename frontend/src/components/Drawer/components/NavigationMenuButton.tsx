import { Drawer } from "../Drawer";
import { FC, useState } from "react";
import { useMain } from "@/contexts";
import { twJoin } from "tailwind-merge";
import { Icon } from "@/components/Icon/Icon";
import { Logo } from "@/components/Logo/Logo";
import { Image } from "@/components/Image/Image";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/Button/Button";
import { useClipboard } from "@/hooks/useClipboard";
import { Locale } from "@/components/Locale/Locale";
import { Link, useNavigate } from "react-router-dom";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { PROFILE_ROUTES } from "@/routes/profile.routes";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Typography } from "@/components/Typography/Typography";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { NavigationBarProps } from "@/components/NavigationBar/NavigationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import {
    IconButton,
    IconButtonProps,
} from "@/components/IconButton/IconButton";

import menu_icon from "@icons/menu.svg";
import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";
import logout_icon from "@icons/logout.svg";
import arrow_icon from "@icons/direction_arrow.svg";

import locales from "@localization/website_page.json";

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
    const Navigate = useNavigate();
    const { direction } = useLocalization();
    const { CopyToClipboard } = useClipboard();

    const [isOpen, setIsOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const { myUser, setMyUser } = useMain();

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

            <Modal
                className="bg-background-light gap-4"
                hasCloseButton
                isOpen={isLogoutModalOpen}
                setIsOpen={setIsLogoutModalOpen}
                closeButtonProps={{ isSquare: true }}
            >
                <Locale className="text-lg font-bold" variant="h1">
                    {locales.modals.logout.title}
                </Locale>
                <Locale variant="p">{locales.modals.logout.paragraph}</Locale>
                <ButtonBox className="w-full place-content-stretch [&>button]:grow">
                    <Button onClick={(_e) => setIsLogoutModalOpen(false)}>
                        <Locale>{locales.modals.logout.buttons.cancel}</Locale>
                    </Button>
                    <Button
                        variant="error"
                        onClick={(_e) => (
                            setMyUser(undefined),
                            Navigate(WEBSITE_ROUTES.base.absolute)
                        )}
                    >
                        <Locale>{locales.modals.logout.buttons.logout}</Locale>
                    </Button>
                </ButtonBox>
            </Modal>

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
                {myUser != null && (
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
                                source={myUser.avatar}
                                alternative={`Image of ${myUser.name}'s Profile.`}
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
                                {myUser.name} {myUser.surname}
                            </Typography>
                            <Typography
                                className={twJoin(
                                    direction == "ltr" && "text-end",
                                    "max-w-44 cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap text-nowrap"
                                )}
                                dir="ltr"
                                variant="p"
                                onClick={(_e) =>
                                    CopyToClipboard(`@${myUser.username}`)
                                }
                            >
                                @{myUser.username}
                            </Typography>
                        </Flexbox>
                    </Flexbox>
                )}

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

                <Flexbox
                    className={twJoin(
                        "mt-auto",
                        direction == "ltr" ? "-ml-6" : "-mr-6"
                    )}
                    direction="column"
                    gap="4"
                >
                    {myUser == null ? (
                        <>
                            <Button
                                link={
                                    REGISTRATION_ROUTES.base.routes.signup
                                        .absolute
                                }
                                icon={{
                                    placement: "left",
                                    source: signup_icon,
                                }}
                            >
                                <Locale>{locales.buttons.signup}</Locale>
                            </Button>
                            <Button
                                variant="primary"
                                link={
                                    REGISTRATION_ROUTES.base.routes.login
                                        .absolute
                                }
                                icon={{
                                    placement: "right",
                                    source: login_icon,
                                }}
                            >
                                <Locale>{locales.buttons.login}</Locale>
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="error"
                            icon={{
                                placement: "right",
                                source: logout_icon,
                            }}
                            onClick={(_e) => (
                                setIsOpen(false), setIsLogoutModalOpen(true)
                            )}
                        >
                            <Locale>{locales.buttons.logout}</Locale>
                        </Button>
                    )}
                    <Logo className="mx-auto" />
                </Flexbox>
            </Drawer>
        </>
    );
};
