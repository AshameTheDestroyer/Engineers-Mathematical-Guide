import { FC } from "react";
import { Logo } from "@/components/Logo/Logo";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Header as Header_ } from "@components/Header/Header";
import { APPLICATION_ROUTES } from "@/routes/application.routes";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { NavigationMenuButton } from "@/components/Drawer/components/NavigationMenuButton";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

import route_locales from "@localization/application_page_routes.json";

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
            <Breadcrumbs
                className="grow"
                Renders={(path) =>
                    path
                        ?.replace(/\i{1,3}$/, (item) => item.toUpperCase())
                        .toTitleCase()
                }
            />
            <ButtonBox>
                <NavigationMenuButton
                    thickness="thin"
                    routes={GetRouteLocales(
                        Object.omit(APPLICATION_ROUTES.base.routes, "courseID"),
                        route_locales,
                        language
                    )}
                />
                <ConfigurationDropDownList thickness="thin" variant="primary" />
            </ButtonBox>
        </Header_>
    );
};
