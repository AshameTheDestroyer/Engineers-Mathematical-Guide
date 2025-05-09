import { FC } from "react";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";
import { Locale } from "@/components/Locale/Locale";
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
        <main className="-mx-6 my-10 flex flex-col gap-8">
            <main
                className={twJoin(
                    direction == "ltr"
                        ? "[&>section:last-child>p]:text-left"
                        : "[&>section:last-child>p]:text-right",
                    "flex max-h-[70vh] flex-col gap-8 overflow-y-scroll scroll-smooth px-8 py-4"
                )}
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
            </main>
            <section className="flex flex-col gap-4 px-8">
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
            </section>
        </main>
    );
};
