import { FC, useState } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import { Typography } from "@/components/Typography/Typography";
import locales from "@localization/help_page.json";
import { Button } from "@/components/Button/Button";
import { WEBSITE_ROUTES } from "@/routes/website.routes";
import { SearchHeader } from "@/components/SearchHeader";
import { useSchematicSearch } from "@/hooks/useSchematicSearch";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { FeedBackPopUp } from "../components/FeedBackPopUp";
import Accordion from "../components/Accordion";

const sections = [
    locales.categories.gettingStarted,
    locales.categories.accountAccess,
    locales.categories.learningResources,
    locales.categories.technicalIssues,
    locales.categories.forEducators,
];

export const HelpPage: FC = () => {
    const { language, GetLocale } = useLocalization();
    const { searchQuery, setSearchQuery } = useSchematicSearch();
    // const [showFeedback, setShowFeedback] = useState(false);

    const [openSections, setOpenSections] = useState<Record<string, boolean>>(
        Object.fromEntries(sections.map((s) => [s.title.en, true]))
    );

    const [openParagraphs, setOpenParagraphs] = useState<
        Record<string, boolean>
    >({});
    // const [userFeedback, setUserFeedback] = useState("");

    const toggleSection = (titleKey: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [titleKey]: !prev[titleKey],
        }));
    };

    const toggleParagraph = (sectionTitle: string, itemIndex: number) => {
        const key = `${sectionTitle}-${itemIndex}`;
        setOpenParagraphs((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <Flexbox
            variant="main"
            direction="column"
            placeItems="center"
            gap="8"
            className="mx-auto w-full max-w-4xl px-4 py-10 md:px-6"
        >
            <SearchHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title={GetLocale(locales.title, language)}
                inputLabel={GetLocale(locales.inputs.search.label, language)}
            />

            <Accordion faqs={locales.paragraphs} />

            <Flexbox
                variant="main"
                direction="column"
                gap="8"
                className="max-w-10xl text-foreground-dark mx-auto w-full px-4 py-6 md:px-6"
            >
                {/* <Flexbox direction="column" gap="3" className="items-center">
                    <Locale variant="p" className="text-foreground-dark">
                        {locales.feedback.question}
                    </Locale>
                    <ButtonBox className="w-32">
                        <Button
                            className="flex-1"
                            onClick={() => setShowFeedback(true)}
                        >
                            <Locale>{locales.feedback.yes}</Locale>
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => setShowFeedback(false)}
                        >
                            <Locale>{locales.feedback.no}</Locale>
                        </Button>
                    </ButtonBox>
                </Flexbox> */}

                <FeedBackPopUp />

                <Flexbox
                    direction="column"
                    gap={10}
                    className="p-8 text-center"
                >
                    <Locale
                        variant="h2"
                        className="text-xl font-bold md:text-2xl"
                    >
                        {locales.cta.text}
                    </Locale>

                    <Button
                        link={WEBSITE_ROUTES.base.routes["contact-us"].absolute}
                        className="h-15 text-xl"
                        variant="primary"
                    >
                        <Locale>{locales.cta.text}</Locale>
                    </Button>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
};
