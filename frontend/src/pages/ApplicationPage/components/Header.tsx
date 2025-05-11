import { FC } from "react";
import { Header as Header_ } from "@components/Header/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs/Breadcrumbs";
import { ConfigurationDropDownList } from "@/components/ConfigurationDropDownList/ConfigurationDropDownList";

export const Header: FC = () => {
    return (
        <Header_
            isSticky
            className="bg-background-dark -m-page mb-page px-[calc(var(--spacing)*4)!important] py-2"
            onScroll={(direction, header) => {
                header.classList[direction == "up" ? "remove" : "add"](
                    "not-hover:not-focus-within:opacity-50"
                );
            }}
        >
            <Breadcrumbs />
            <ConfigurationDropDownList thickness="thin" variant="primary" />
        </Header_>
    );
};
