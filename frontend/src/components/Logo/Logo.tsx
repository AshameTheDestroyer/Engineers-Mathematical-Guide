import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import logo from "@images/logo_(horizontal).png";

export type LogoProps = ChildlessComponentProps<HTMLAnchorElement>;

export const Logo: FC<LogoProps> = ({ id, ref, className }) => {
    return (
        <Link
            id={id}
            ref={ref}
            className={twMerge("block h-16", className)}
            to={WEBSITE_ROUTES.base.routes.home.absolute}
        >
            <img className="h-full" src={logo} alt="logo" />
        </Link>
    );
};
