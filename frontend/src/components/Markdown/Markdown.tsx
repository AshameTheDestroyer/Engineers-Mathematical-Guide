import { twJoin, twMerge } from "tailwind-merge";
import { RichText } from "../RichText/RichText";
import { FC, JSX, PropsWithChildren } from "react";
import { Separator } from "../Separator/Separator";
import { MarkdownDTO } from "@/schemas/MarkdownSchema";
import { MathExpression } from "../MathExpression/MathExpression";
import { useLocalization } from "../LocalizationProvider/LocalizationProvider";

export type MarkdownProps = MarkdownDTO;

export const Markdown: FC<MarkdownProps> = ({ props, element, children }) => {
    const { direction } = useLocalization();

    const Element = (() => {
        switch (element) {
            case "ul":
                return ({ className, ...props }) => (
                    <ul
                        className={twMerge(
                            "list-disc",
                            direction == "ltr" ? "pl-8" : "pr-8",
                            className as string
                        )}
                        {...props}
                    />
                );
            // @ts-expect-error
            case "li":
                if (typeof children != "string") {
                    return (props) => <li {...props} />;
                }
            case "a":
            case "p":
            case "q":
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
            case "th":
            case "td":
                return ({ className, children, ...props }) => (
                    <RichText
                        className={twMerge(
                            (
                                {
                                    h1: "text-2xl font-bold",
                                    h2: "text-xl font-bold",
                                    h3: "text-lg font-bold",
                                    h4: "text-md font-bold",
                                    h5: "text-xs font-bold",
                                    h6: "text-xs",
                                    a: "text-secondary-normal font-bold underline",
                                    q: twJoin(
                                        "bg-background-dark-hover border-3 border-transparent",
                                        direction == "ltr"
                                            ? "border-l-primary-normal! rounded-r-lg pl-2"
                                            : "border-r-primary-normal! rounded-l-lg pr-2"
                                    ),
                                } as Record<typeof element, string>
                            )[element],
                            className as string
                        )}
                        variant={element}
                        ExtractedTextRenders={(text) =>
                            text.startsWith("$") && text.endsWith("$") ? (
                                <MathExpression
                                    className="inline-block"
                                    inline
                                    variant="span"
                                >
                                    {text.slice(1, -1)}
                                </MathExpression>
                            ) : (
                                <span className="text-primary-normal font-bold">
                                    {text}
                                </span>
                            )
                        }
                        {...props}
                    >
                        {children as string}
                    </RichText>
                );
            case "mathjax":
                return ({ className, children, ...props }) => (
                    <MathExpression
                        variant="p"
                        className={twMerge("text-center", className as string)}
                        {...props}
                    >
                        {children as string}
                    </MathExpression>
                );
            case "table":
                return ({ className, ...props }) => (
                    <table
                        className={twMerge(
                            "[&_:is(td,th)]:border-background-darker [&>thead>tr]:bg-background-dark-active [&>tbody>tr:nth-of-type(2n)]:bg-background-dark-hover [&_:is(td,th)]:border-2 [&_:is(td,th)]:p-2 [&_:is(td,th)]:text-start",
                            className as string
                        )}
                        {...props}
                    />
                );
            case "hr":
                return ({ className, ...props }) => (
                    <Separator
                        className={twMerge(
                            "border-background-darker",
                            className as string
                        )}
                        thickness="thick"
                        orientation="horizontal"
                        {...props}
                    />
                );
            default:
                const Element_ = element as unknown as (
                    props: PropsWithChildren
                ) => JSX.Element;
                return (props) => <Element_ {...props} />;
        }
    })() as (props: PropsWithChildren<MarkdownDTO["props"]>) => JSX.Element;

    return (
        <Element {...(props as any)}>
            {children == null
                ? undefined
                : typeof children == "string"
                  ? children
                  : children.map((child, i) => <Markdown key={i} {...child} />)}
        </Element>
    );
};
