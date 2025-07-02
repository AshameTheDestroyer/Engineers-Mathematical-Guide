import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    SyntaxHighlighterProps,
    Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

export type CodeBlockProps = {
    theme?: keyof typeof styles;
} & OmitIndexSignature<SyntaxHighlighterProps> &
    ChildlessComponentProps<SyntaxHighlighter>;

export const CodeBlock: FC<CodeBlockProps> = ({
    id,
    ref,
    children,
    className,
    theme = "vscDarkPlus",
    ...props
}) => {
    return (
        <SyntaxHighlighter
            id={id}
            ref={ref}
            className={twMerge(
                "p-8! [&>code]:text-md! whitespace-pre rounded-2xl [direction:ltr]",
                className
            )}
            style={styles[theme]}
            {...props}
        >
            {children}
        </SyntaxHighlighter>
    );
};
