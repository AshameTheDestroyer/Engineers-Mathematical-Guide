import { twMerge } from "tailwind-merge";
import { Flexbox } from "../Flexbox/Flexbox";
import { FC, PropsWithChildren, useState } from "react";
import { Logo } from "@/components/Logo/Logo";
import { Header } from "@components/Header/Header";
import { ComponentProps } from "@/types/ComponentProps";
import { ButtonBox } from "@/components/ButtonBox/ButtonBox";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { JumpToTopButton } from "../JumpToTopButton/JumpToTopButton";
import { useScreenSize } from "../ScreenSizeProvider/ScreenSizeProvider";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { NavigationMenuButton } from "@/components/Drawer/components/NavigationMenuButton";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";
import { MathToolsDropDownList } from "../MathToolsBar/MathToolsBar";
import { UnitCircleWidget } from "../MathToolsBar/components/UnitCircleWidget";

export type ApplicationBarProps = ComponentProps<HTMLDivElement> & {
    baseRoute: string;
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
    baseRoute,
    className,
    withoutLogo,
    routeLocales,
    withoutBreadcrumbs,
}) => {
    const { isScreenSize } = useScreenSize();
    const { GetRouteLocales, language, direction } = useLocalization();
    const [activeWidget, setActiveWidget] = useState<React.ReactNode>(null);

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
                        className="text-md overflow-hidden max-sm:text-sm [&>*]:flex-wrap max-sm:[&_.icon>svg]:h-4 max-sm:[&_.icon>svg]:w-4"
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
                <ButtonBox className="place-content-end place-items-center">
                    <ConfigurationDropDownList
                        className={
                            direction == "ltr"
                                ? "max-lg:[&>div>div]:translate-x-12"
                                : "max-lg:[&>div>div]:-translate-x-12"
                        }
                        thickness="thin"
                        variant="secondary"
                    />
                    <MathToolsDropDownList
                        className={
                            direction == "ltr"
                                ? "max-lg:[&>div>div]:translate-x-12"
                                : "max-lg:[&>div>div]:-translate-x-12"
                        }
                        thickness="thin"
                        variant="secondary"
                        position="bottom-end"
                        onToolSelect={setActiveWidget}
                    />
                    <NavigationMenuButton
                        thickness="thin"
                        base={baseRoute}
                        routes={GetRouteLocales(routes, routeLocales, language)}
                    />
                </ButtonBox>
            </ButtonBox>
            {activeWidget && (
                // <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-20">
                //     <div className="relative max-h-screen max-w-4xl overflow-auto rounded-xl bg-white p-2 shadow-2xl">
                //         {/* Close Button */}
                //         <button
                //             onClick={() => setActiveWidget(null)}
                //             className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 text-black hover:bg-gray-300"
                //         >
                //             ✕
                //         </button>
                //         {activeWidget}
                //     </div>
                // </div>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="relative max-h-screen max-w-4xl overflow-hidden rounded-xl bg-white p-1 shadow-2xl">
                        {activeWidget}
                    </div>
                </div>
            )}
            {isScreenSize["max-lg"] && <JumpToTopButton />}
        </Header>
    );
};
