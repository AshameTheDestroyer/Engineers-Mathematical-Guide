import { twMerge } from "tailwind-merge";
import { Flexbox } from "../Flexbox/Flexbox";
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
                "bg-background-dark flex-nowrap place-items-start transition duration-200",
                className
            )}
            isSticky
            onHeaderScroll={(direction, header) => {
                header.classList[direction == "up" ? "remove" : "add"](
                    "not-hover:not-focus-within:opacity-50"
                );
            }}
        >
            <Flexbox wrap="wrap" gap="4">
                {!withoutLogo && <Logo className="h-10 min-w-max" />}
                {!withoutBreadcrumbs && (
                    <Breadcrumbs
                        className="overflow-hidden [&>*]:flex-wrap"
                        Renders={(path) =>
                            path?.toTitleCase("i", "ii", "iii", "ai")
                        }
                    />
                )}
            </Flexbox>
            {children}
            <ButtonBox className="min-h-10 min-w-20 flex-wrap-reverse place-items-center [&>*]:grow">
                {buttons != null && (
                    <ButtonBox className="[&>*]:grow">{buttons}</ButtonBox>
                )}
                <ButtonBox className="place-content-end">
                    <ConfigurationDropDownList
                        thickness="thin"
                        variant="secondary"
                    />
                    <NavigationMenuButton
                        thickness="thin"
                        routes={GetRouteLocales(routes, routeLocales, language)}
                    />
                </ButtonBox>
            </ButtonBox>
        </Header>
    );
};
