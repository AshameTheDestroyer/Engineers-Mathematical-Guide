import { FC } from "react";
import { Header as Header_ } from "@components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

export const Header: FC = () => {
    return (
        <Header_
            className="bg-background-dark transition duration-200"
            isSticky
            onScroll={(direction, header) => {
                header.classList[direction == "up" ? "remove" : "add"](
                    "not-hover:not-focus-within:opacity-50"
                );
            }}
        >
            <Breadcrumbs
                Renders={(path) =>
                    path
                        ?.replace(/\i{1,3}$/, (item) => item.toUpperCase())
                        .toTitleCase()
                }
            />
            <ConfigurationDropDownList thickness="thin" variant="primary" />
        </Header_>
    );
};
