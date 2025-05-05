import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { LANDING_ROUTES } from "@/routes/landing.routes";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import logo from "@images/logo_(horizontal).png";

export type LogoProps = ChildlessComponentProps<HTMLAnchorElement>;

export const Logo: FC<LogoProps> = ({ id, ref, className }) => {
    return (
        <Link
            id={id}
            ref={ref}
            className={twMerge("block h-16", className)}
            to={LANDING_ROUTES.base.routes.home.absolute}
        >
            <img className="h-full" src={logo} alt="logo" />
        </Link>
    );
};
