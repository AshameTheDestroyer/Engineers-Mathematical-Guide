import { FC } from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/components/Locale/Locale";
import { ChildlessComponentProps } from "@/types/ComponentProps";
import { RichText, RichTextProps } from "@/components/RichText/RichText";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { Flexbox } from "@/components/Flexbox/Flexbox";

export type TermsSectionProps = {
    references?: Array<string>;
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
    references,
    BodyExtractedTextRenders,
}) => {
    const { GetLocale, language } = useLocalization();

    const ExtractedTextRenders =
        BodyExtractedTextRenders ?? FallbackExtractedTextRenders;

    function FallbackExtractedTextRenders(text: string) {
        if (text.startsWith("#")) {
            return (
                <span
                    id={text.replace("#", "").toLowerCase()}
                    tabIndex={0}
                    className="focus-within:bg-secondary-normal focus-within:text-secondary-light inline rounded-md transition duration-300"
                >
                    "{text.replace("#", "")}"
                </span>
            );
        }

        if (text.startsWith("@")) {
            const trimmedText = text.replace("@", "").toLowerCase();
            const index =
                (language == "ar"
                    ? references?.findIndex(
                          (text_) =>
                              text_.arabicCompareWithoutArticle(trimmedText) ==
                              0
                      )
                    : references?.indexOf(trimmedText)) ?? -1;

            return (
                <Link
                    className="text-secondary-normal"
                    to={`#${references?.[index] ?? trimmedText}`}
                    onClick={(_e) =>
                        document
                            .getElementById(references?.[index] ?? trimmedText)
                            ?.focus()
                    }
                >
                    <span>{text.replace("@", "")}</span>
                    <sup>{index + 1}</sup>
                </Link>
            );
        }

        return <span className="text-primary-normal font-bold">{text}</span>;
    }

    return (
        <Flexbox
            id={id}
            ref={ref}
            className={twMerge("text-justify", className)}
            gap="4"
            variant="section"
            direction="column"
        >
            <Locale variant="h2" className="text-lg font-bold">
                {locales.title}
            </Locale>
            <RichText variant="p" ExtractedTextRenders={ExtractedTextRenders}>
                {GetLocale(locales.body, language)}
            </RichText>
        </Flexbox>
    );
};
