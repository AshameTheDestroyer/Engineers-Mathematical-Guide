import { FC } from "react";
import { Link } from "react-router-dom";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type NavigationBarProps = ChildlessComponentProps & {
    routes: Array<{
        text: string;
        href: string;
    }>;
};

export const NavigationBar: FC<NavigationBarProps> = ({
    id,
    routes,
    className,
}) => {
    return (
        <nav id={id} className={className}>
            <ul className="flex flex-row place-content-around gap-5">
                {routes.map((link, i) => (
                    <li key={i}>
                        <Link to={link.href}>{link.text}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
