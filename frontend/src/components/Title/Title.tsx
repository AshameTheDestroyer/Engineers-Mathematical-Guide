import { FC, useEffect } from "react";

export type TitleProps = {
    children: string;
};

export const Title: FC<TitleProps> = ({ children }) => {
    useEffect(() => {
        document.title = children;
    }, [children]);

    return <></>;
};
