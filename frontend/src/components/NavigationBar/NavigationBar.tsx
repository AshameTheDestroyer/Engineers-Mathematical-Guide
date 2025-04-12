import { FC } from "react";
// import { Link } from "react-router-dom";
import { ChildlessComponentProps } from "@types_/ComponentProps";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

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
            <ul className="flex flex-row flex-wrap place-content-around gap-5">
                {/* {routes.map((link, i) => (
                    <li key={i}>
                        <Link to={link.href}>{link.text}</Link>
                    </li>
                ))} */}
                <Breadcrumbs
                    items={routes}
                    className="rounded-lg p-4 shadow-sm"
                    activeItemClasses="text-indigo-700 font-semibold"
                    inactiveItemClasses="text-gray-500 hover:text-indigo-500"
                />
            </ul>
        </nav>
    );
};
