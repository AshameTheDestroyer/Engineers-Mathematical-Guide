import { FC } from "react";
import { ChildlessComponentProps } from "@types_/ComponentProps";

export type NavigationBarProps = ChildlessComponentProps & {
    links: Array<{
        text: string;
        href: string;
    }>;
};

export const NavigationBar: FC<NavigationBarProps> = ({
    id,
    links,
    className,
}) => {
    return (
        <nav id={id} className={className}>
            <ul className="flex flex-row place-content-around gap-5">
                {links.map((link, i) => (
                    <li key={i}>
                        <a href={link.href}>{link.text}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
