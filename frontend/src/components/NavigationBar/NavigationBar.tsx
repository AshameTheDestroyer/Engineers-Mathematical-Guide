import { FC } from "react";

export type NavigationBarProps = {
    links: Array<{
        text: string;
        href: string;
    }>;
};

export const NavigationBar: FC<NavigationBarProps> = ({ links }) => {
    return (
        <nav>
            <ul className="flex flex-row gap-5">
                {links.map((link) => (
                    <li>
                        <a href={link.href} className="underline decoration-2">
                            {link.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
