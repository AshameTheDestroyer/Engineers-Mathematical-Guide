import { Icon } from "../Icon/Icon";
import { FC, Fragment } from "react";
import { twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

import arrow_icon from "@icons/direction_arrow.svg";

export type BreadcrumbsProps = ChildlessComponentProps<HTMLDivElement> & {
    length?: number;
    Renders?: (path: string | undefined) => string | undefined;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({
    id,
    ref,
    length,
    Renders,
    className,
}) => {
    const location = useLocation();
    const paths = location.pathname == "/" ? [] : location.pathname.split("/");

    const { direction } = useLocalization();

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

    function GetPathLink(path: string, i: number) {
        if (i == 0) {
            return "/";
        }

        return paths
            .filter((path) => path != null)
            .slice(0, paths.indexOf(path) + 1)
            .join("/");
    }

    function GetPathText(path: string, i: number) {
        if (path == null) {
            return "...";
        }

        if (i == 0) {
            return direction == "ltr" ? "/" : "\\";
        }

        return Renders?.(path) ?? path?.toTitleCase();
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
            <ol className="flex items-center gap-x-2 gap-y-1 overflow-x-auto py-2">
                {shownPaths.map((path, i) => (
                    <Fragment key={i}>
                        <li className="flex items-center">
                            {path == null ? (
                                <p>...</p>
                            ) : (
                                <Link to={GetPathLink(path, i)}>
                                    {GetPathText(path, i)}
                                </Link>
                            )}
                        </li>
                        {i < paths.length - 1 && (
                            <li>
                                <Icon
                                    className={
                                        direction == "ltr"
                                            ? "rotate-90"
                                            : "rotate-270"
                                    }
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
