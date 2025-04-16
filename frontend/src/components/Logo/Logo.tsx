import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import logo from "@images/logo_(horizontal).png";

export type LogoProps = ChildlessComponentProps<HTMLAnchorElement>;

export const Logo: FC<LogoProps> = ({ id, ref, className }) => {
    return (
        <Link
            id={id}
            ref={ref}
            className={twMerge("block h-16", className)}
            to="/"
        >
            <img className="h-full" src={logo} alt="logo" />
        </Link>
    );
};
