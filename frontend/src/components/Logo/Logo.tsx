import { FC } from "react";

import logo from "@images/logo_(horizontal).png";

export const Logo: FC = () => {
    return (
        <a className="block h-16" href="/">
            <img className="h-full" src={logo} alt="logo" />
        </a>
    );
};
