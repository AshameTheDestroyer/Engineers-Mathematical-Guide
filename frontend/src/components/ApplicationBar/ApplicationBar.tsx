import { twMerge } from "tailwind-merge";
import { FC, PropsWithChildren } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header } from "@components/Header/Header";
import { ComponentProps } from "@/types/ComponentProps";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { NavigationMenuButton } from "@/components/Drawer/components/NavigationMenuButton";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

export type ApplicationBarProps = ComponentProps<HTMLDivElement> & {
    withoutLogo?: boolean;
    withoutBreadcrumbs?: boolean;
    routes: Record<string, Anchor>;
    buttons?: PropsWithChildren["children"];
    routeLocales: Record<string, Record<string, string>>;
};

export const ApplicationBar: FC<ApplicationBarProps> = ({
    id,
    ref,
    routes,
    buttons,
    children,
    className,
    withoutLogo,
    routeLocales,
    withoutBreadcrumbs,
}) => {
    const { GetRouteLocales, language } = useLocalization();

    return (
        <Header
            id={id}
            ref={ref}
            className={twMerge(
                "bg-background-dark transition duration-200",
                className
            )}
            isSticky
            onScroll={(direction, header) => {
                header.classList[direction == "up" ? "remove" : "add"](
                    "not-hover:not-focus-within:opacity-50"
                );
            }}
        >
            {!withoutLogo && <Logo className="h-10" />}
            {!withoutBreadcrumbs && (
                <Breadcrumbs
                    className="grow"
                    Renders={(path) =>
                        path
                            ?.replace(/\i{1,3}$/, (item) => item.toUpperCase())
                            .toTitleCase()
                    }
                />
            )}
            {children}
            <ButtonBox>
                {buttons}
                <ConfigurationDropDownList
                    thickness="thin"
                    variant="secondary"
                />
                <NavigationMenuButton
                    thickness="thin"
                    routes={GetRouteLocales(routes, routeLocales, language)}
                />
            </ButtonBox>
        </Header>
    );
};
