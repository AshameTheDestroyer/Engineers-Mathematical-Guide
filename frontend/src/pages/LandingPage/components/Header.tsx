import { FC } from "react";
import { LINKS } from "../../../constants/links";
import { Logo } from "../../../components/Logo/Logo";
import { Button } from "../../../components/Button/Button";
import { NavigationBar } from "../../../components/NavigationBar/NavigationBar";

export const Header: FC = () => {
    return (
        <div className="-m-page mb-page p-page bg-foreground-normal flex flex-row place-items-center justify-between gap-8 text-white [&>nav]:grow">
            <Logo />
            <NavigationBar links={LINKS} />
            <div className="flex gap-4">
                <Button>Sign up</Button>
                <Button variant="primary">Login</Button>
            </div>
        </div>
    );
};
