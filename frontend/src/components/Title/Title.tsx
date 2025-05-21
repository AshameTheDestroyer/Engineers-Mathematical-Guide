import { FC, useEffect, useState } from "react";

export type TitleProps = {
    exact?: boolean;
    children: string;
};

export const Title: FC<TitleProps> = ({ exact, children }) => {
    const [rootTitle, _setRootTitle] = useState(document.title);

    useEffect(() => {
        document.title = exact ? children : `${rootTitle} - ${children}`;

        return () => {
            document.title = rootTitle;
        };
    }, [children]);

    return <></>;
};
