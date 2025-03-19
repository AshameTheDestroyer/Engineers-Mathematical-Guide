import { FC } from "react";
import { Logo } from "../../../components/Logo/Logo";

export const Header: FC = () => {
    return (
        <div className="-m-page mb-page p-page bg-amber-400">
            <Logo />
        </div>
    );
};
