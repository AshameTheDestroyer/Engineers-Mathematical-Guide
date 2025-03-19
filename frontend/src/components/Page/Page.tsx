import { FC } from "react";
import { ComponentProps } from "../../types/ComponentProps";

export const Page: FC<ComponentProps> = ({ id, className, children }) => {
    return (
        <main
            id={id}
            className={[
                "page flex min-h-screen flex-col",
                className,
            ].toClassName()}
        >
            {children}
        </main>
    );
};
