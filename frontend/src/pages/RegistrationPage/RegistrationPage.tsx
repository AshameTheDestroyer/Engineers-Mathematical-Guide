import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { Logo } from "@/components/Logo/Logo";
import { twJoin, twMerge } from "tailwind-merge";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

export const RegistrationPage: FC = () => {
    useDefaultRoute("/registration", "/signup");

    const { direction } = useLocalization();

    return (
        <Page className="gap-page grid grid-cols-2 place-content-center place-items-center max-lg:flex">
            <ConfigurationDropDownList
                className={twJoin(
                    direction == "ltr" ? "right-page" : "left-page",
                    "top-page absolute z-10"
                )}
            />
            <main className="flex w-full min-w-[25vw] max-w-[min(30rem,80vw)] items-center justify-center">
                <Outlet />
            </main>
            <section
                className={twMerge(
                    direction == "ltr"
                        ? "-mr-page bg-gradient-to-l"
                        : "-ml-page bg-gradient-to-r",
                    "from-background-dark -my-page relative z-[-1] h-screen place-self-stretch self-stretch to-transparent",
                    "max-lg:absolute max-lg:inset-0 max-lg:top-3/4 max-lg:m-0 max-lg:h-auto max-lg:bg-gradient-to-t"
                )}
            >
                <Logo
                    className={twJoin(
                        direction == "ltr" ? "right-page" : "left-page",
                        "bottom-page absolute max-sm:bottom-[calc(var(--spacing-page)/4)] max-sm:scale-75",
                        direction == "ltr"
                            ? "max-lg:right-1/2 max-lg:translate-x-1/2"
                            : "max-lg:left-1/2 max-lg:-translate-x-1/2"
                    )}
                />
            </section>
        </Page>
    );
};
