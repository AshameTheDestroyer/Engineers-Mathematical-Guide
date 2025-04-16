import { FC } from "react";
import { twJoin } from "tailwind-merge";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { Logo } from "@/components/Logo/Logo";
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
                className={twJoin(
                    direction == "ltr"
                        ? "-mr-page bg-gradient-to-l"
                        : "-ml-page bg-gradient-to-r",
                    "from-primary-normal -my-page relative h-screen place-self-stretch self-stretch to-transparent max-lg:hidden"
                )}
            >
                <Logo
                    className={twJoin(
                        direction == "ltr" ? "right-page" : "left-page",
                        "bottom-page absolute"
                    )}
                />
            </section>
        </Page>
    );
};
