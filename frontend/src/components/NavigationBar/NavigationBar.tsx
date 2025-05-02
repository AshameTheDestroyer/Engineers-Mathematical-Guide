import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type NavigationBarProps = ChildlessComponentProps & {
    routes: Array<Anchor>;
};

export const NavigationBar: FC<NavigationBarProps> = ({
    id,
    routes,
    className,
}) => {
    return (
        <nav
            id={id}
            className={twMerge("flex place-content-center", className)}
        >
            <ul className="flex flex-row flex-wrap place-content-around gap-5">
                {routes.map((link, i) => (
                    <li key={i}>
                        <Link to={link.href}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
