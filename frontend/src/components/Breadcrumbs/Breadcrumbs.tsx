import React from "react";
import { Icon } from "../Icon/Icon";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import arrow_icon from "@icons/direction_arrow.svg";

export type BreadcrumbsProps = ChildlessComponentProps<HTMLElement>;

export const Breadcrumbs = ({ id, ref, className }: BreadcrumbsProps) => {
    const location = useLocation();
    const paths = location.pathname == "/" ? [] : location.pathname.split("/");

    return (
        <nav
            id={id}
            ref={ref}
            className={twMerge(
                "flex items-center bg-inherit text-sm shadow-[none!important]",
                className
            )}
        >
            <ol className="flex items-center space-x-1 overflow-x-auto py-2">
                {paths.map((path, i) => (
                    <React.Fragment key={i}>
                        <li className="flex items-center">
                            <Link
                                className="text-md flex items-center whitespace-nowrap"
                                to={`/${paths.slice(0, i + 1).join("/")}`}
                            >
                                {i == 0 ? "/" : path.toTitleCase()}
                            </Link>
                        </li>
                        {i < paths.length - 1 && (
                            <li>
                                <Icon
                                    className="mx-2 rotate-90"
                                    width={24}
                                    height={24}
                                    source={arrow_icon}
                                />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};
