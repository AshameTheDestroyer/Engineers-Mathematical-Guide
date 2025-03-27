import { FC } from "react";
import { Link } from "react-router-dom";

import logo from "@images/logo_(horizontal).png";

export const Logo: FC = () => {
    return (
        <Link className="block h-16" to="/">
            <img className="h-full" src={logo} alt="logo" />
        </Link>
    );
};
