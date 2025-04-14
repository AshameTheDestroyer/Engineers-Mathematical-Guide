import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { Logo } from "@/components/Logo/Logo";
import { useDefaultRoute } from "@/hooks/useDefaultRoute";

export const RegistrationPage: FC = () => {
    useDefaultRoute("/registration", "/signup");

    return (
        <Page>
            <section className="flex min-h-screen">
                <Outlet />
                <div className="flex w-full flex-col sm:flex-row">
                    <section className="from-primary-normal to-primary-dark-active relative h-1/6 bg-gradient-to-r sm:min-h-screen sm:w-1/3 md:min-h-screen md:w-1/2">
                        <div className="absolute bottom-4 right-4 rounded p-2 text-white">
                            <Logo />
                        </div>
                    </section>
                </div>
            </section>
        </Page>
    );
};
