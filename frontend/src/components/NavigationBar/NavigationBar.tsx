import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type NavigationBarProps = ChildlessComponentProps<HTMLDivElement> & {
    routes: Array<Anchor>;
};

export const NavigationBar: FC<NavigationBarProps> = ({
    id,
    ref,
    routes,
    className,
}) => {
    return (
        <nav id={id} ref={ref} className={twMerge("flex", className)}>
            <ul className="flex grow flex-row flex-wrap place-content-around gap-6">
                {routes.map((link, i) => (
                    <li key={i}>
                        <Link to={link.href}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
