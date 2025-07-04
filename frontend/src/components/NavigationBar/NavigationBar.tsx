import { FC, PropsWithChildren } from "react";
import { twJoin, twMerge } from "tailwind-merge";
import { Link, useLocation } from "react-router-dom";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type NavigationBarProps = ChildlessComponentProps<HTMLDivElement> & {
    base: string;
    routes: Array<Anchor>;
    direction: "column" | "row";
    Renders?: (
        route: Anchor & { selected: boolean },
        i: number,
        array: Array<Anchor & { selected: boolean }>
    ) => PropsWithChildren["children"];
};

export const NavigationBar: FC<NavigationBarProps> = ({
    id,
    ref,
    base,
    routes,
    Renders,
    className,
    direction,
}) => {
    const { pathname } = useLocation();

    if (base == null) {
        return <></>;
    }

    const RenderedRouters = routes
        .map((route) => ({
            ...route,
            selected: pathname.startsWith(
                (base + (base.endsWith("/") ? "" : "/") + route.href).replace(
                    /\/$/,
                    ""
                )
            ),
        }))
        .map(Renders ?? (() => undefined));

    return (
        <nav id={id} ref={ref} className={twMerge("flex", className)}>
            <ul
                className={twJoin(
                    direction == "column" && "flex-col",
                    "flex flex-wrap place-content-around gap-6"
                )}
            >
                {routes.map((route, i) => (
                    <li key={i}>
                        {RenderedRouters[i] ?? (
                            <Link to={route.href}>{route.title}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
