import { useMain } from "@/contexts";
import { FC, useEffect } from "react";

export type TitleProps = {
    exact?: boolean;
    children: string;
};

export const Title: FC<TitleProps> = ({ exact, children }) => {
    const { rootTitle } = useMain();

    useEffect(() => {
        document.title = exact ? children : `${rootTitle} - ${children}`;

        return () => {
            document.title = rootTitle;
        };
    }, [children]);

    return <></>;
};
