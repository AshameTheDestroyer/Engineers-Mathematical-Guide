import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { Logo } from "@/components/Logo/Logo";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";

export const RegistrationPage: FC = () => {
    useDefaultRoute("/registration", "/signup");

    return (
        <Page className="gap-page grid grid-cols-2 place-content-center place-items-center max-lg:flex">
            <Outlet />
            <section className="from-primary-normal -my-page -mr-page relative h-screen place-self-stretch self-stretch bg-gradient-to-l to-transparent max-lg:hidden">
                <div className="absolute bottom-4 right-4 rounded p-2 text-white">
                    <Logo />
                </div>
            </section>
        </Page>
    );
};
