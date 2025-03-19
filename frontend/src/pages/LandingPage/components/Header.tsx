import { FC } from "react";
import { LINKS } from "../../../constants/links";
import { Logo } from "../../../components/Logo/Logo";
import { NavigationBar } from "../../../components/NavigationBar/NavigationBar";

export const Header: FC = () => {
    return (
        <div className="-m-page mb-page p-page flex flex-row place-items-center justify-between bg-gray-100">
            <Logo />
            <NavigationBar links={LINKS} />
        </div>
    );
};
