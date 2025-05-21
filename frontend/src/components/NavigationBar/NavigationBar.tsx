import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type NavigationBarProps = ChildlessComponentProps<HTMLDivElement> & {
    routes: Array<Anchor>;
    direction: "column" | "row";
};

export const NavigationBar: FC<NavigationBarProps> = ({
    id,
    ref,
    routes,
    className,
    direction,
}) => {
    return (
        <nav id={id} ref={ref} className={twMerge("flex", className)}>
            <ul
                className={twMerge(
                    "flex flex-wrap place-content-around gap-6",
                    direction == "column" ? "flex-col" : "",
                    className
                )}
            >
                {routes.map((link, i) => (
                    <li key={i}>
                        <Link to={link.href}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
