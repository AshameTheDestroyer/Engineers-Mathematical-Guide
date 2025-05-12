import { FC } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header as Header_ } from "@/components/Header/Header";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";
import { NavigationMenuButton } from "@/components/Drawer/components/NavigationMenuButton";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import route_locales from "@localization/test_page_routes.json";
import { TEST_ROUTES } from "@/routes/test.routes";

export const Header: FC = () => {
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
            <Logo className="h-10" />
            <ButtonBox>
                <NavigationMenuButton
                    thickness="thin"
                    routes={GetRouteLocales(
                        TEST_ROUTES != null
                            ? { ...TEST_ROUTES.base.routes }
                            : {},
                        route_locales,
                        language
                    )}
                />
                <ConfigurationDropDownList thickness="thin" variant="primary" />
            </ButtonBox>
        </Header_>
    );
};
