import React from "react";
import { Icon } from "../Icon/Icon";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import arrow_icon from "@icons/direction_arrow.svg";

export type BreadcrumbsProps = ChildlessComponentProps<HTMLElement> & {
    length?: number;
};

export const Breadcrumbs = ({
    id,
    ref,
    length,
    className,
}: BreadcrumbsProps) => {
    const location = useLocation();
    const paths = location.pathname == "/" ? [] : location.pathname.split("/");
    const shownPaths =
        length == null
            ? paths
            : [
                  ...paths.slice(
                      0,
                      length % 2 == 0 ? length / 2 : (length - 1) / 2
                  ),
                  undefined,
                  ...paths.slice(
                      length % 2 == 0
                          ? paths.length - length / 2
                          : paths.length - (length + 1) / 2
                  ),
              ]
                  .filter((path) =>
                      length != null && paths.length > length
                          ? true
                          : path != null
                  )
                  .filter((path, i, paths) => i == paths.indexOf(path));

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
                {shownPaths.map((path, i) => (
                    <React.Fragment key={i}>
                        <li className="text-md flex items-center">
                            {path == null ? (
                                <p>...</p>
                            ) : (
                                <Link
                                    to={
                                        i == 0
                                            ? "/"
                                            : paths
                                                  .filter(
                                                      (path) => path != null
                                                  )
                                                  .slice(
                                                      0,
                                                      paths.indexOf(path) + 1
                                                  )
                                                  .join("/")
                                    }
                                >
                                    {path == null
                                        ? "..."
                                        : i == 0
                                          ? "/"
                                          : path?.toTitleCase()}
                                </Link>
                            )}
                        </li>
                        {i < shownPaths.length - 1 && (
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
