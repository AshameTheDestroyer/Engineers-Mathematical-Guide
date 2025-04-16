import { Icon } from "../Icon/Icon";
import { FC, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { ChildlessComponentProps } from "@/types/ComponentProps";

import arrow_icon from "@icons/direction_arrow.svg";

export type BreadcrumbsProps = ChildlessComponentProps<HTMLElement> & {
    length?: number;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
    id,
    ref,
    length,
    className,
}) => {
    const location = useLocation();
    const paths = location.pathname == "/" ? [] : location.pathname.split("/");

    if (length != null && length < 2) {
        throw Error("Length cannot be less than 2.");
    }

    const shownPaths = GenerateShownPaths()
        .filter(FilterDots)
        .filter((path, i, paths) => i == paths.indexOf(path));

    function GenerateShownPaths() {
        if (length == null) {
            return paths;
        }

        const startIndex = length % 2 == 0 ? length / 2 : (length - 1) / 2;
        const endIndex =
            length % 2 == 0
                ? paths.length - length / 2
                : paths.length - (length + 1) / 2;

        return [
            ...paths.slice(0, startIndex),
            undefined,
            ...paths.slice(endIndex),
        ];
    }

    function FilterDots(path?: string) {
        return length != null && paths.length > length ? true : path != null;
    }

    function GetFullPath(i: number, path: string) {
        if (i == 0) {
            return "/";
        }

        return paths
            .filter((path) => path != null)
            .slice(0, paths.indexOf(path) + 1)
            .join("/");
    }

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
                    <Fragment key={i}>
                        <li className="text-md flex items-center">
                            {path == null ? (
                                <p>...</p>
                            ) : (
                                <Link to={GetFullPath(i, path)}>
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
                    </Fragment>
                ))}
            </ol>
        </nav>
    );
};
