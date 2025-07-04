import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { useClipboard } from "@/hooks/useClipboard";
import { IconButton } from "../IconButton/IconButton";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import * as styles from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    SyntaxHighlighterProps,
    Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";

import copy_icon from "@icons/copy.svg";

export type CodeBlockProps = {
    hideCopyButton?: boolean;
    theme?: keyof typeof styles;
} & OmitIndexSignature<SyntaxHighlighterProps> &
    ChildlessComponentProps<HTMLDivElement>;

export const CodeBlock: FC<CodeBlockProps> = ({
    id,
    ref,
    children,
    className,
    hideCopyButton,
    theme = "vscDarkPlus",
    ...props
}) => {
    const { CopyToClipboard } = useClipboard({
        ar: "تَمّ نَسخُ الشّيفرة.",
        en: "Code copied.",
    });

    return (
        <div
            id={id}
            ref={ref}
            className={twMerge(
                "[&_code]:text-md! [&>*:first-child]:p-8! relative [&>*:first-child]:rounded-2xl [&>*:first-child]:[direction:ltr]",
                className
            )}
        >
            <SyntaxHighlighter style={styles[theme]} {...props}>
                {children}
            </SyntaxHighlighter>
            {!hideCopyButton && (
                <IconButton
                    thickness="thin"
                    className="absolute right-4 top-6"
                    icon={{
                        thickness: 0.5,
                        source: copy_icon,
                        className: "scale-85",
                        stroke: "currentColor",
                    }}
                    onClick={(_e) =>
                        CopyToClipboard(
                            typeof children == "string"
                                ? children
                                : children.join("\n")
                        )
                    }
                />
            )}
        </div>
    );
};
