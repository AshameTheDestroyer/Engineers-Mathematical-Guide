import { FC, Fragment, PropsWithChildren } from "react";
import { Typography, TypographyProps } from "../Typography/Typography";

export type RichTextProps = {
    children?: string;
    extractor?: string;
    ExtractedTextRenders: (
        text: string,
        i: number
    ) => PropsWithChildren["children"];
} & Either<{ variant?: undefined }, Omit<TypographyProps, "children">>;

export const RichText: FC<RichTextProps> = ({
    id,
    ref,
    variant,
    children,
    className,
    extractor = "**",
    ExtractedTextRenders,
    ...props
}) => {
    const escapedExtractor = extractor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const extractorRegExp = new RegExp(
        `(${escapedExtractor}.*?${escapedExtractor})`,
        "g"
    );

    const isTextExtracted = (text: string) =>
        text.startsWith(extractor) && text.endsWith(extractor);

    const texts = children?.split(extractorRegExp);
    const extractedTexts = texts?.filter(isTextExtracted);

    const Content: FC = () => {
        return texts?.map((text, i) => (
            <Fragment key={i}>
                {isTextExtracted(text)
                    ? ExtractedTextRenders(
                          text.slice(extractor.length, -extractor.length),
                          extractedTexts?.indexOf(text)!
                      )
                    : text}
            </Fragment>
        ));
    };

    if (variant == null) {
        return <Content />;
    }

    return (
        <Typography
            id={id}
            ref={ref}
            className={className}
            variant={variant}
            {...props}
        >
            <Content />
        </Typography>
    );
};
