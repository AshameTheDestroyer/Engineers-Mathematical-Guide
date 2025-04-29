import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/components/Locale/Locale";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { RichText, RichTextProps } from "@/components/RichText/RichText";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

export type TermsSectionProps = {
    BodyExtractedTextRenders?: RichTextProps["ExtractedTextRenders"];
    locales: {
        title: Record<string, string>;
        body: Record<string, string>;
    };
} & ChildlessComponentProps<HTMLDivElement>;

export const TermsSection: FC<TermsSectionProps> = ({
    id,
    ref,
    locales,
    className,
    BodyExtractedTextRenders,
}) => {
    const { GetLocale, language } = useLocalization();

    const ExtractedTextRenders =
        BodyExtractedTextRenders ??
        ((text) => (
            <span className="text-primary-normal font-bold">{text}</span>
        ));

    return (
        <section
            id={id}
            ref={ref}
            className={twMerge("flex flex-col gap-4 text-justify", className)}
        >
            <Locale variant="h2" className="text-lg font-bold">
                {locales.title}
            </Locale>
            <RichText variant="p" ExtractedTextRenders={ExtractedTextRenders}>
                {GetLocale(locales.body, language)}
            </RichText>
        </section>
    );
};
