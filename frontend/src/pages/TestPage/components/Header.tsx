import { FC, useState } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header as Header_ } from "@/components/Header/Header";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";
import { NavigationMenuButton } from "@/components/Drawer/components/NavigationMenuButton";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { Drawer } from "@/components/Drawer/Drawer";
import { NavigationBar } from "@/components/NavigationBar/NavigationBar";
import { TEST_ROUTES } from "@/routes/test.routes";

import route_locales from "@localization/test_page_routes.json";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
export const Header: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { GetRouteLocales, language } = useLocalization();

    return (
        <Header_
            className="bg-background-dark transition duration-200"
            isSticky
            onScroll={(direction, header) => {
                header.classList[direction == "up" ? "remove" : "add"](
                    "not-hover:not-focus-within:opacity-50"
                );
            }}
        >
            <Logo />
            <ButtonBox>
                <NavigationMenuButton
                    position="right"
                    onClick={() => setIsOpen((isOpen) => !isOpen)}
                />
                <ConfigurationDropDownList variant="primary" />
            </ButtonBox>

            <Drawer
                className="px-8 pt-16"
                isOpen={isOpen}
                direction="top"
                setIsOpen={setIsOpen}
            >
                <NavigationBar
                    routes={GetRouteLocales(
                        TEST_ROUTES != null
                            ? { ...TEST_ROUTES.base.routes }
                            : {},
                        route_locales,
                        language
                    )}
                />
            </Drawer>
        </Header_>
    );
};
