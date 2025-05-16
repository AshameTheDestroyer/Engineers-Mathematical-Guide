import { FC } from "react";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { RichText } from "@/components/RichText/RichText";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { TermsSection, TermsSectionProps } from "../components/TermsSection";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";

import locales from "@localization/terms_and_conditions.json";

export const TermsAndConditionsPage: FC = () => {
    const { direction, GetLocale, language } = useLocalization();

    const references = GetLocale(
        locales.references as unknown as Record<string, string>,
        language
    ) as unknown as Array<string>;

    return (
        <Flexbox
            className="-mx-6 my-10"
            gap="8"
            variant="main"
            direction="column"
        >
            <Flexbox
                className={twJoin(
                    direction == "ltr"
                        ? "[&>section:last-child>p]:text-left"
                        : "[&>section:last-child>p]:text-right",
                    "max-h-[70vh] overflow-y-scroll scroll-smooth px-8 py-4"
                )}
                gap="8"
                variant="main"
                direction="column"
            >
                <Locale
                    variant="h1"
                    className="bg-background-light sticky -top-4 z-[1] -mx-8 px-8 py-4 text-2xl font-bold"
                >
                    {locales.title}
                </Locale>
                {Object.keys(
                    Object.omit(locales, "title", "references", "last-option")
                ).map((key, i) => (
                    <TermsSection
                        key={i}
                        references={references}
                        locales={
                            locales[
                                key as keyof typeof locales
                            ] as TermsSectionProps["locales"]
                        }
                    />
                ))}
            </Flexbox>
            <Flexbox
                className="px-8"
                gap="4"
                variant="section"
                direction="column"
            >
                <RichText
                    variant="p"
                    ExtractedTextRenders={(text) => (
                        <Link
                            className="text-primary-normal underline"
                            to={REGISTRATION_ROUTES.base.routes.signup.absolute}
                        >
                            {text}
                        </Link>
                    )}
                >
                    {GetLocale(locales["last-option"], language)}
                </RichText>
            </Flexbox>
        </Flexbox>
    );
};
